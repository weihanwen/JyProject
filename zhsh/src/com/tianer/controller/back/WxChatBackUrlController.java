package com.tianer.controller.back;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tianer.controller.base.BaseController;
import com.tianer.controller.tongyongUtil.TongYong;
import com.tianer.util.Const;
import com.tianer.util.DateUtil;
import com.tianer.util.PageData;
import com.tianer.util.ServiceHelper;
import com.tianer.util.wxpay.WXPayPath;
import com.tianer.util.wxpay.WXPayUtil;

/** 
 * 微信公众号的全部回调地址
 * @author Administrator
 *
 */
@Controller("wxChatBackUrlController")
@RequestMapping(value="/back_chat")
public class WxChatBackUrlController extends BaseController { 
	
	
	private String success= "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml> "; 
	private String notsuccess="<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[]]></return_msg></xml>";
	private String notsign="<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名错误]]></return_msg></xml>";
	private String notorder="<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[订单不存在]]></return_msg></xml>";
	private String notmoney="<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[金额不一致]]></return_msg></xml>";
 	
	
	 
	/**
	 * 微信支付回调接口
	* 方法名：Notify
	* wxback_chat/notify.do
	* 
    */
	@RequestMapping(value="/notify")
	@ResponseBody
	public void Notify(PrintWriter out,HttpServletRequest request) throws Exception{
 		String inputLine;
		StringBuilder sb =new StringBuilder();
		String resXml="";//返回数据
 		try {
			while ((inputLine = request.getReader().readLine()) != null) {
				sb.append(inputLine);
			}
			request.getReader().close();
			String xmlStr = sb.toString();
 			//验签
			WXPayPath dodo = new WXPayPath("3");
			boolean signflag=dodo.YanQian(xmlStr);
			if(!signflag){
				ServiceHelper.getAppPcdService().saveLog(xmlStr, "回调的订单验签失败","0099");
				resXml=notsign;
			}else{
				Map<String, String> map =  WXPayUtil.xmlToMap( xmlStr );
 	 	 		//1.订单id
				String out_trade_no=(String)map.get("out_trade_no");
	 			//2.流水单号
				String tradnumber = (String) map.get("transaction_id");
	 			//3.总金额
				String total_fee=(String) map.get("total_fee");
				//4.支付类型  1-优惠买单支付，2-购买提货券商品,3-优选商品,4-充值商品
				String attach=(String) map.get("attach");
	 			//是否成功
				Object result_code=map.get("result_code");
				if("SUCCESS".equals(result_code)){ 
						 if(attach.equals("1")){
							 resXml=YhmdHuiDiao(out_trade_no, tradnumber, total_fee, map);
						 }else if(attach.equals("2")){
							 resXml=ThjHuiDiao(out_trade_no, tradnumber, total_fee, map);
						 }else if(attach.equals("3")){
							 resXml=YxThjHuiDiao(out_trade_no, tradnumber, total_fee, map);
						 }else{
							 resXml=chongzhi(out_trade_no, tradnumber, total_fee, map);
						 }
						//logger记录
						ServiceHelper.getAppPcdService().saveLog(xmlStr, "微信回调的订单结果","wx");
 			 	}else{
 					ServiceHelper.getAppPcdService().saveLog(out_trade_no, "支付失败"+map.toString(),"0099");
 					resXml=notsuccess;	 
				}		
			}
   		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			ServiceHelper.getAppPcdService().saveLog(resXml, "系统异常","9999");
		}
 		out.write(resXml);
		out.close();
 	}
	
	/**
	 * 优惠买单回调处理
	 */
	public String YhmdHuiDiao(String out_trade_no,String tradnumber,String total_fee,Map<String, String>  map){
 		try {
 			double actionmoney=(new BigDecimal(Double.parseDouble(total_fee)/100)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    		PageData pd=new PageData();
    		pd.put("order_id", out_trade_no);
    		pd=ServiceHelper.getAppOrderService().findById(pd);//订单详情
    		if(pd == null){
    			 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "优惠买单的订单不存在"+map.toString(),"0099");
     			 return notorder;
    		}
    		if(pd.getString("order_status").equals("1")){
    			return success;
    		}
    		double actual_money=Double.parseDouble(pd.getString("actual_money"));
    		if(actionmoney != actual_money){
    			 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "优惠买单的订单金额不匹配"+map.toString(),"0099");
 				 return notmoney;
    		}
 			pd.put("order_tn", tradnumber);
			TongYong.historyByOrder(pd, pd.getString("channel"), "2","wx",true);
    		if(pd.getString("store_operator_id").contains("jy")){
	    		//发送推送
			    TongYong.sendTuiSong(pd.getString("store_id"), out_trade_no, "2", pd.getString("store_id"), "1", pd.getString("sale_money"),"");
			}else{
				//发送推送
			    TongYong.sendTuiSong(pd.getString("store_operator_id"), out_trade_no, "2", pd.getString("store_operator_id"), "11", pd.getString("sale_money"),"");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return success;
		}
 		return success;
	}
	/**
	 * 提货券回调处理
	 */
	public String ThjHuiDiao(String out_trade_no,String tradnumber,String total_fee,Map<String, String>  map){
  		try {
 			double actionmoney=(new BigDecimal(Double.parseDouble(total_fee)/100)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
    		PageData pd=new PageData();
    		pd.put("order_id", out_trade_no);
    		pd=ServiceHelper.getAppOrderService().findById(pd);//订单详情
    		if(pd == null){
    			 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "提货券的订单不存在"+map.toString(),"0099");
     			 return notorder;
    		}
    		if(pd.getString("order_status").equals("1")){
    			return success;
    		}
    		double actual_money=Double.parseDouble(pd.getString("actual_money"));
    		if(actionmoney != actual_money){
    			 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "提货券的订单金额不匹配"+map.toString(),"0099");
 				 return notmoney;
    		}
 			//修改订单状态
		   	pd.put("order_status", "1");
  			pd.put("order_tn", tradnumber);
			ServiceHelper.getAppOrderService().editStatus(pd);
    		//新增会员历史记录以及红包状态以及总后台记录
 			TongYong.saveMemberHistory(pd, ServiceHelper.getAppMemberService().findById(pd), ServiceHelper.getAppStoreService().findById(pd));
 			//发送推送
		    TongYong.sendTuiSong(pd.getString("store_id"), out_trade_no, "3", pd.getString("store_id"), "1", pd.getString("sale_money"),"");
 		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return success;
		}
 		return success;
 	}
	
	
	/**
	 * 优选订单回调处理
	 */
	public String YxThjHuiDiao(String out_trade_no,String tradnumber,String total_fee,Map<String, String>  map){
		try {
				double actionmoney=(new BigDecimal(Double.parseDouble(total_fee)/100)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
  	 			PageData glpd=new PageData();
				glpd.put("guanlian_id", out_trade_no);
 				glpd=ServiceHelper.getAppOrderService().getguanlianById(glpd);
				if(glpd != null && glpd.getString("status").equals("0")){
					String[] allbeguanlian_id=glpd.getString("beguanlian_id").split(",");
	       			PageData orderpd=null;
					PageData mpd=null;
					PageData waterpd=null;
					PageData moneypd=null;
					double allmoney=0;
					for (int i = 0; i < allbeguanlian_id.length; i++) {
						orderpd=new PageData();
						orderpd.put("order_id", allbeguanlian_id[i]);
						orderpd.put("order_status", "1");
	 					orderpd.put("order_tn", tradnumber);
	 					ServiceHelper.getAppOrderService().editStatus(orderpd);
		   				//订单详情
		   				orderpd=ServiceHelper.getAppOrderService().findById(orderpd);
		   				if(orderpd != null){
		   					allmoney+=Double.parseDouble(orderpd.getString("actual_money"));
				   			//用户详情
  	 			       		mpd=ServiceHelper.getAppMemberService().findById(orderpd);
	 			       		//扣减积分
	 		    			if(Double.parseDouble(orderpd.getString("user_integral")) > 0){
		 		    				moneypd=new PageData();
		 					 		moneypd.put("pay_way", "integralmoney");
		 					 		moneypd.put("member_id",orderpd.getString("member_id"));
		 						  	ServiceHelper.getAppMemberService().updateMemberById(moneypd); 
		 						  	moneypd.clear();
		 							//新增个人积分消费历史
		 							moneypd.put("wealth_type", "1");
		 							moneypd.put("consume_type", "2");
		 							moneypd.put("member_id",orderpd.getString("member_id"));
		 							moneypd.put("content", ServiceHelper.getAppStoreService().findById(orderpd).getString("store_name")+"消费抵用");
		 							moneypd.put("number", "-"+orderpd.getString("user_integral"));
		 							moneypd.put("now_money", TongYong.df2.format(Double.parseDouble(mpd.getString("now_integral"))-Double.parseDouble(orderpd.getString("user_integral"))));
		 							moneypd.put("jiaoyi_id", orderpd.getString("order_id"));
		 							moneypd.put("jiaoyi_status", "1");
			   						moneypd.put("member_wealthhistory_id", BaseController.getXFUID(mpd.getString("show_lookid")));
			 						ServiceHelper.getAppMember_wealthhistoryService().saveWealthhistory(moneypd);
		 							moneypd.clear();
		 							//更新积分
		 		  					moneypd.put("member_id", orderpd.getString("member_id"));
		 							moneypd.put("now_integral", TongYong.df2.format(Double.parseDouble(mpd.getString("now_integral"))-Double.parseDouble(orderpd.getString("user_integral"))));
		 							ServiceHelper.getAppMemberService().edit(moneypd);
	 		    			}
			 			   	waterpd=new PageData();
	 	    				waterpd.put("pay_status","97");
	 	    	   			waterpd.put("waterrecord_id", allbeguanlian_id[i]);
	 	   					waterpd.put("user_id", orderpd.getString("payer_id"));
	 	   					waterpd.put("user_type", "2");
	 	    				waterpd.put("withdraw_rate","0");
	 	   					waterpd.put("money_type","2");
	 	   	 				waterpd.put("money", orderpd.getString("sale_money"));
	 	   	 				waterpd.put("reduce_money",orderpd.getString("discount_money"));
	 	   					waterpd.put("arrivalmoney", TongYong.df2.format(Double.parseDouble(orderpd.getString("sale_money"))-Double.parseDouble(orderpd.getString("discount_money"))));
	 	   					waterpd.put("nowuser_money", mpd.getString("now_money"));
	 	    				waterpd.put("application_channel", orderpd.getString("in_jiqi")); 
	 	    				waterpd.put("remittance_type","3" );
 	    	 				waterpd.put("alipay_money",orderpd.getString("actual_money") );
 	    	 				waterpd.put("remittance_name",Const.payjiqi[3] );
		 	   				waterpd.put("integral_money",orderpd.getString("user_integral")); 
		 	   				waterpd.put("balance_money",orderpd.getString("user_balance")); 
	 	   					waterpd.put("remittance_number",mpd.getString("phone"));//支付人的支付账号
	 	    				waterpd.put("createtime",DateUtil.getTime());
	 	   					waterpd.put("over_time",DateUtil.getTime());
	 	   					waterpd.put("jiaoyi_type","5");
	 	    				waterpd.put("payee_number",orderpd.getString("store_id"));
	 	     	 			waterpd.put("order_tn", orderpd.getString("order_tn"));
	 	   					waterpd.put("province_name", mpd.getString("province_name"));
	 	   					waterpd.put("city_name", mpd.getString("city_name"));
	 	   					waterpd.put("area_name", mpd.getString("area_name"));
	 	    				ServiceHelper.getWaterRecordService().saveWaterRecord(waterpd);
	 	    				waterpd=null;
		 	 				//获取商品信息
	 						List<PageData> goodsList=ServiceHelper.getAppGoodsService().getGoodsIdByOrder(orderpd);
	 						for(PageData goodspd : goodsList){
	 							goodspd.put("member_id", orderpd.getString("member_id"));
	 							//清空购物车
	 							ServiceHelper.getShopCarService().delShop(goodspd);
		 	 				}
	 						//发送推送
						    TongYong.sendTuiSong(orderpd.getString("store_id"), orderpd.getString("order_id"), "3", orderpd.getString("store_id"), "1", orderpd.getString("sale_money"),"");
		   				}else{
		   					ServiceHelper.getAppPcdService().saveLog(out_trade_no+"="+allbeguanlian_id[i], "优选回调的订单不存在"+map.toString(),"0099");
		   				}
				}
				glpd.put("status", "1");//0-未处理，1-已处理
				ServiceHelper.getAppOrderService().updateguanlian(glpd);
				//判断金额是不是一致
				if(allmoney != actionmoney){
					 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "优选回调的订单金额不匹配"+map.toString(),"0099");
	 				 return notmoney;
				}
	 		}else{
	 			if(glpd != null && glpd.getString("status").equals("1")){
	 				 return success;
	 			}else{
	 				ServiceHelper.getAppPcdService().saveLog(out_trade_no, "优选回调的订单不存在"+map.toString(),"0099");
	     			return notorder;
	 			}
 	 		}
 		} catch (Exception e) {
			// TODO: handle exception
 			e.printStackTrace();
 			return success;
		}
 		return success;
	}
	
	/**
	 * 充值
	 * @param out_trade_no
	 * @param tradnumber
	 * @param total_fee
	 * @param map
	 * @return
	 */
	public String chongzhi(String out_trade_no,String tradnumber,String total_fee,Map<String, String>  map){
		try {
 	        //新增用户余额充值记录
			PageData pd=new PageData();
			pd.put("waterrecord_id", out_trade_no);
			pd=ServiceHelper.getWaterRecordService().findWaterRecordByBackPay(pd);
			if(pd == null ){
				 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "充值回调的订单不存在"+map.toString(),"0099");
				 return notorder;
			}else{
				if(pd.getString("pay_status").equals("1")){
 					 return success;
				}
				double actionmoney=(new BigDecimal(Double.parseDouble(total_fee)/100)).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
				//判断当前充值订单的金额和返回的金额是不是一致的
				double jymoney=Double.parseDouble(pd.getString("money"));
				if(actionmoney != jymoney){
					 ServiceHelper.getAppPcdService().saveLog(out_trade_no, "充值回调的订单金额不匹配"+map.toString(),"0099");
					 return notmoney;
				}else{
					pd.put("member_id", pd.getString("user_id"));
 	 			    double now_money=Double.parseDouble(ServiceHelper.getAppMemberService().findWealthById(pd).getString("now_money"));
		 			PageData moneypd=new PageData();
	  				moneypd.put("member_id", pd.getString("member_id"));
	   				moneypd.put("wealth_type", "2");//1-积分，2-金钱
	  				moneypd.put("consume_type", "1");//1-收益，2-支出
	  				moneypd.put("content", "充值");
	  				moneypd.put("number", TongYong.df2.format(actionmoney));
	  				moneypd.put("now_money", TongYong.df2.format(now_money+actionmoney));
		  			moneypd.put("jiaoyi_id", out_trade_no);
		  			moneypd.put("jiaoyi_status", "1");
		  			moneypd.put("member_wealthhistory_id", out_trade_no);
		  			ServiceHelper.getAppMember_wealthhistoryService().saveWealthhistory(moneypd); 
		  			//更新会员充值次数
		  			moneypd=null;
		  			moneypd=new PageData();
 		  			int cz_number=Integer.parseInt(ServiceHelper.getAppMemberService().findById(pd).getString("cz_number"))+1;
		  			moneypd.put("cz_number", cz_number);
		  			moneypd.put("member_id",  pd.getString("member_id"));
		  			moneypd.put("now_money", TongYong.df2.format(now_money+actionmoney));
	  				ServiceHelper.getAppMemberService().edit(moneypd);
		  			if(cz_number == 1){//新增会员的魅力值
 		  				TongYong.charm_numberAdd(pd.getString("member_id"), Const.charm_number[9]); 
	  				}
		  			//更新支付信息
		  			pd.put("pay_status", "1");
		  			pd.put("order_tn", tradnumber);
		  			pd.put("nowuser_money", TongYong.df2.format(now_money+actionmoney));
 		  			ServiceHelper.getWaterRecordService().editWaterRecord(pd);
 				}
			}
		
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
 		}
		return success;
	}
	
	

	
	 
	
	 
	
}

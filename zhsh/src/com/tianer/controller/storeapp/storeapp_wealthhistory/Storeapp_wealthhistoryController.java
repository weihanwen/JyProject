package com.tianer.controller.storeapp.storeapp_wealthhistory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tianer.controller.base.BaseController;
import com.tianer.controller.memberapp.tongyongUtil.TongYong;
import com.tianer.entity.Page;
import com.tianer.service.business.store_shift.Store_shiftService;
import com.tianer.service.storeapp.ChatRedService;
import com.tianer.service.storeapp.Payapp_historyService;
import com.tianer.service.storepc.liangqin.basemanage.StoreManageService;
import com.tianer.service.storepc.store_wealthhistory.Storepc_wealthhistoryService;
import com.tianer.util.AppUtil;
import com.tianer.util.Const;
import com.tianer.util.PageData;
import com.tianer.util.ServiceHelper;
import com.tianer.util.SmsUtil;
import com.tianer.util.StringUtil;



/** 
* 类名称：Storeapp_wealthhistoryController
* 创建人：邢江涛  app
* 创建时间：2016-06-29 
*/
@Controller("storeapp_wealthhistoryController")
@RequestMapping(value="/storeapp_wealthhistory")
public class Storeapp_wealthhistoryController extends BaseController{
	
	@Resource(name = "ChatRedService")
	private ChatRedService chatRedService;
	
	/**
	 * 商品在线销售明细列表
	 */
	@RequestMapping(value="/listThq")
	@ResponseBody
	public Object listThq(Page page) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
			pd = this.getPageData();
			String login_type=pd.getString("login_type");
			String login_id=pd.getString("login_id");
			if(login_type.equals("2")){//操作员登录
				pd.put("store_operator_id", login_id);
			} 
			String pagenumber=pd.getString("pagenumber");
			if(pagenumber == null || pagenumber.equals("")){
				pagenumber="0";
			}
			page.setCurrentPage(Integer.parseInt(pagenumber));
			pd.put("pay_type", "3");
			page.setPd(pd);
			List<PageData>	orderList = pcwealthhistoryService.orderlistPage(page);	//列出Store列表
			for(PageData e : orderList){
 	 			 if(e.getString("tihuo_id") != null && !e.getString("tihuo_id").equals("")){
	 					String s=e.getString("tihuo_id").substring(0, 2)+"****"+e.getString("tihuo_id").substring(6, 10);
	 					e.put("w_tihuo_id", s);
	 			 }
	 			if(e.getString("name").length() == 11){
					e.put("name", e.getString("name").substring(0, 3)+"****"+e.getString("name").substring(7, 11));
				}
	 			if(e.getString("pay_type") != null &&  e.getString("pay_type").equals("3")){
 	 				if(e.getString("pay_sort_type").equals("2")){
	 					e.put("pay_type_name", "优选提货卷");
	 				}else{
	 					e.put("pay_type_name", "提货卷");
	 				}
 				} 
 			}
 			pd.put("varList", orderList);
		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
		map.put("result", result);
		map.put("message", message);
		map.put("data", pd);
		return map;
	}
	
	
	@Resource(name="store_shiftService")
	private Store_shiftService store_shiftService;
	
	/**
	 * 流水明细列表 login_id   login_type
	 */
	@RequestMapping(value="/liushuiList")
	@ResponseBody
	public Object liushuiList(Page page) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
 		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
			pd = this.getPageData();
			String login_type=pd.getString("login_type");
			String login_id=pd.getString("login_id");
			String pagenumber=pd.getString("pagenumber");
			if(pagenumber == null || pagenumber.equals("")){
				pagenumber="0";
			}
			if(login_type.equals("2")){//操作员登录
				pd.put("store_operator_id", login_id);
			}else{
				if(pd.getString("store_operator_id") != null && !pd.getString("store_operator_id").equals("")){
					pd.put("store_operator_id", pd.getString("store_operator_id").trim());
				}
			}
  			page.setCurrentPage(Integer.parseInt(pagenumber));
			page.setPd(pd);
			List<PageData>	varList = pcwealthhistoryService.weallistPage(page);	//列出Store列表
			PageData mpd=null;
			PageData spd=null;
			int length=varList.size();
			PageData e=null;
			for (int i = 0; i < length; i++) {
				e=varList.get(i);
  				if(e.getString("user_id") != null){
					if(e.getString("user_type").equals("2")){
						mpd=new PageData();
						mpd.put("member_id", e.getString("user_id"));
						mpd=ServiceHelper.getAppMemberService().findById(mpd);
						if(e.getString("user_id").length() != 5 &&  mpd != null){
							String image_url=mpd.getString("image_url");
							String user_phone=mpd.getString("phone");
							user_phone=user_phone.substring(0, 3)+"****"+user_phone.substring(7, 11);
							String user_name=mpd.getString("name");
							if(user_name.length() == 11){
								user_name=user_name.substring(0, 3)+"****"+user_name.substring(7, 11);
							}
							e.put("user_name", user_name);
							e.put("user_phone", user_phone);
							e.put("user_image_url", image_url);
						}else{
							e.put("user_name", Const.jiuyuname);
							e.put("user_phone", Const.jiuyuname);
							e.put("user_image_url", "");
						}
					}else if(e.getString("user_type").equals("1")){
						 spd=new PageData();
						 spd.put("store_id",  e.getString("user_id"));
						 spd=ServiceHelper.getAppStoreService().findById(spd);
						 if(spd != null){
							e.put("user_phone",  spd.getString("registertel_phone"));
							e.put("user_name", spd.getString("store_name"));
							e.put("user_image_url", spd.getString("pictrue_url"));
		 				 }else{
		 					e.put("user_id", "");
							e.put("user_name", "");
							e.put("user_image_url", "");
		 				 }
 					}else{
						e.put("user_id", "");
						e.put("user_name", "");
						e.put("user_image_url", "");
					}
 				}else{
					e.put("user_id", "");
					e.put("user_name", "");
					e.put("user_image_url", "");
				}
				if(e.getString("profit_type") != null && !e.getString("profit_type").equals("")){
					//类型
					e.put("profit_name", Const.storeorderprofit_type[Integer.parseInt(e.getString("profit_type"))]);
				}
				if(e.getString("tihuo_status") == null){
					e.put("tihuo_status", "0");
				}
 			}
			pd.put("varList", varList);
   			//类型集合
			List<PageData> lxlist =new ArrayList<PageData>();
			for(int i=0;i< Const.storeorderprofit_type.length ; i++){
				e=new PageData();
				if(i != 0 && i !=4 && i != 5  && i != 16 && i != 15){
					e.put("typenumber", i+"");
					e.put("typename", Const.storeorderprofit_type[i]);
					lxlist.add(e);
				}
 			}
 			pd.put("lxlist", lxlist);
 			//获取所有操作员列表
 			List<PageData> splist = storeManageService.listAll(pd);
			pd.put("splist", splist);
			if(login_type.equals("2")){
				pd.put("store_shift_id", splist.get(0).getString("store_shift_id"));
			} else{
				pd.remove("store_shift_id");
			}
 			//获取当前商家的班次 
  			List<PageData> shiftList=store_shiftService.listAll(pd);
 			pd.put("shiftList", shiftList);
 		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
		map.put("result", result);
		map.put("message", message);
		map.put("data", pd);
		return map;
	}
	
	/**
	 * 流水明细列表
	 */
	@RequestMapping(value="/appLiuShuilist")
	@ResponseBody
	public Object appLiuShuilist(Page page) throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
 		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
			pd = this.getPageData();
			String chuli_type = pd.getString("chuli_type");//1-总流水，2-在线销售，3-充值提现，4-销售
 			String currentPage = pd.getString("currentPage");
 			if(null != currentPage && !"".equals(currentPage)){
 				pd.put("nowpage", (Integer.parseInt(currentPage)- 1)*10);
			}else{
				pd.put("nowpage",  0 );
 			}
  			//列出支付列表
			page.setPd(pd);
  			List<PageData>	varList = pcwealthhistoryService.weallistPage(page);	//列出Store列表
			for(PageData e : varList){
 	 			 if(e.getString("tihuo_id") != null && !e.getString("tihuo_id").equals("")){
	 					String s=e.getString("tihuo_id").substring(0, 2)+"****"+e.getString("tihuo_id").substring(6, 10);
	 					e.put("tihuo_id", s);
	 			 }
 				if(e.getString("user_id") != null){
					PageData mpd=new PageData();
					mpd.put("member_id", e.getString("user_id"));
					mpd=ServiceHelper.getAppMemberService().findById(mpd);
					if(e.getString("user_id").length() != 5 &&  mpd != null){
						String user_phone=mpd.getString("phone");
						user_phone=user_phone.substring(0, 3)+"****"+user_phone.substring(7, 11);
						String user_name=mpd.getString("name");
						if(user_name.length() == 11){
							user_name=user_name.substring(0, 3)+"****"+user_name.substring(7, 11);
						}
						e.put("user_name", user_name);
						e.put("user_phone", user_phone);
						e.put("user_type", "2");
					}else{
						e.put("user_name", Const.jiuyuname);
						e.put("user_phone", Const.jiuyuname);
						e.put("user_type", "1");
					}
				}else{
					e.put("user_name", "");
					e.put("user_phone", "");
					e.put("user_type", "0");
				}
				if(e.getString("profit_type") != null && !e.getString("profit_type").equals("")){
					//类型
					e.put("profit_name", Const.storeorderprofit_type[Integer.parseInt(e.getString("profit_type"))]);
				}
 			}
			pd.put("varList", varList);
			//获取所有操作员列表
			List<PageData> splist = storeManageService.listAll(pd);
			pd.put("splist", splist);
			//获取当前商家的班次 
 			List<PageData> shiftList=store_shiftService.listAll(pd);
 			pd.put("shiftList", shiftList);
  		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
		map.put("result", result);
		map.put("message", message);
		map.put("data", pd);
		return map;
	}
	 
	
	
	/**
	 * 查询充值记录/提现记录/余额明细
	 * @param page
	 * @return
	 * nowpage
	 * storeapp_wealthhistory/listinfo.do?nowpage=1&store_id=47883919
	 */
	@RequestMapping(value="/listinfo")
	@ResponseBody
	public Object listinfo(Page page){
		Map<String,Object> map = new HashMap<String,Object>();
		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
			pd = this.getPageData();
			String nowpage=pd.getString("nowpage");
			if(nowpage == null || nowpage.equals("")){
				nowpage="0";
			}
			page.setPd(pd);
			page.setCurrentPage(Integer.parseInt(nowpage));
			//获取积分/金钱,商家id，收益/消费
			List<PageData> varList = pcwealthhistoryService.listPageinfo(page);
			int n=varList.size();
			PageData e=null;
			for (int i = 0; i < n ; i++) {
				e=varList.get(i);
				if(e.getString("remittance_number").length() > 4){
					e.put("yc_", e.getString("remittance_number").substring(e.getString("remittance_number").length()-5, e.getString("remittance_number").length()-1));
				}else{
					e.put("yc_", e.getString("remittance_number"));
				}
 				if(e.getString("pay_type").contains("alipay")){
					e.put("pay_name", "支付宝");
				}else if(e.getString("pay_type").contains("wx")){
					e.put("pay_name", "微信");
				}else if(e.getString("pay_type").contains("unionpay")){
					e.put("pay_name", "银联");
				}
				if(e.getString("profit_type").equals("1")){
					e.put("pay_name",e.getString("pay_name")+ "提现");
				}else if(e.getString("profit_type").equals("2")){
					e.put("pay_name",e.getString("pay_name")+ "充值");
				}
 			}
			map.put("data", varList);
 		} catch(Exception e){
			result="0";
			map.put("message", "获取异常");
			logger.error(e.toString(), e);
		}
		map.put("result", result);
		map.put("message",message);
		return AppUtil.returnObject(pd, map);
	}
	
	
	/**
	 * 验证码支付密码
	 */
	@RequestMapping(value="/code")
	@ResponseBody
	public Object code() throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		String code=StringUtil.getSixRandomNum();
 		//String code="123456";
		try{
			pd = this.getPageData();
			String phone=pd.getString("phone");
			
			SmsUtil.sendZcCode(phone, code);
//			SmsUtil.sendDx(phone, code);
		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
  		map.put("result", result);
 		map.put("message", message);
 		map.put("data", code);
 		return AppUtil.returnObject(pd, map);
	}
	
	@Resource(name = "storepc_wealthhistoryService")
	private Storepc_wealthhistoryService pcwealthhistoryService;
	
	@Resource(name="payapp_historyService")
	private Payapp_historyService historyService;
	
	
	/**
	 * 商品在线销售明细详情
	 */
	@RequestMapping(value="/findOrderDetail")
	@ResponseBody
	public Object findOrderDetail() throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
		 		pd = this.getPageData();
   			 	pd=historyService.tihuoByOrderId(pd);
 				pd=TongYong.getGoodsListByOrder(pd);
 				//获取商品信息
			    if(pd.getString("name") != null && pd.getString("name").equals("") &&  pd.getString("name").length() == 11){
			    	pd.put("name", pd.getString("name").substring(0, 3)+"****"+pd.getString("name").substring(7, 11));
			    }
			    if(pd.getString("tihuo_id") != null && !pd.getString("tihuo_id").equals("")){
					String s=pd.getString("tihuo_id").substring(0, 2)+"****"+pd.getString("tihuo_id").substring(6, 10);
					pd.put("w_tihuo_id", s);
				}
			   if(pd.getString("phone") != null && pd.getString("phone").length() == 11){
				   pd.put("click_phone", pd.getString("phone"));
				   pd.put("phone", pd.getString("phone").substring(0, 3)+"****"+pd.getString("phone").substring(7, 11));
			   }
		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
		map.put("result", result);
		map.put("message", message);
		map.put("data", pd);
		return map;
	}
	
	
	/**
	 * 提货卷退款
	 */
	@RequestMapping(value="/returnBackOrder")
	@ResponseBody
	public Object returnBackOrder() throws Exception{
		Map<String,Object> map = new HashMap<String,Object>();
 		String result = "1";
		String message="获取成功";
		PageData pd = new PageData();
		try{
 	 		pd=this.getPageData();
	 		pd=TongYong.TiHuoReturnOrder(pd,"1");
	 		result=pd.getString("result");
	 		message=pd.getString("message");
		}catch(Exception e){
			logger.error(e.toString(), e);
			message="获取失败";
			result="0";
		}
		map.put("result", result);
		map.put("message", message);
		map.put("data", "");
		return map;
	}
	

	/**
	 *    zhsh/storeapp_wealthhistory/updRemark.do
	 *    编辑备注:remark ,order_id
	 */
	@RequestMapping(value="/updRemark")
	@ResponseBody
	public Object updRemark(){
 		PageData pd = new PageData();
 		Map<String,Object> map = new HashMap<String,Object>();
 		String result = "1";
		String message="修改成功";
 		try {
			pd = this.getPageData();
			ServiceHelper.getStorepc_wealthhistoryService().updRemark(pd);
		} catch (Exception e) {
			e.printStackTrace();
			result="0";
			message="修改失败";
		}
 		map.put("result", result);
		map.put("message", message);
		map.put("data", "");
 		return map;
 	}
	
	
	
	
	@Resource(name="storeManageService")
	private StoreManageService storeManageService;

}

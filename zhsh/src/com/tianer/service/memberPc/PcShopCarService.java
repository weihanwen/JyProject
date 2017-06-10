package com.tianer.service.memberPc;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tianer.dao.DaoSupport;
import com.tianer.util.PageData;

/***
 * 购物车会员pc
 * @author 邢江涛
 *
 */
@Service("pcShopCarService")
public class PcShopCarService {
	
	@Resource(name = "daoSupport")
	private DaoSupport dao;


	
	/*
	 * 我的购物车列表
	 */
	public List<PageData> shopCarList(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.shopCarList", pd);
	}
	
	/*
	 * 我的购物车详情
	 */
	public PageData findById(PageData pd)throws Exception{
		return (PageData)dao.findForObject("XJTShopCarMapper.findById", pd);
	}
 
	
	/*
	* 批量删除购物车的商品
	*/
	public void deleteAll(String[] ArrayShopcart_id)throws Exception{
		dao.delete("XJTShopCarMapper.deleteAll", ArrayShopcart_id);
	}
	
	/*
	 * 获取正在去结算的商品的商家ID
	 */
	public List<PageData> getStoreIdByToPay(String[] ArrayShopcart_id)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.getStoreIdByToPay", ArrayShopcart_id);
	}
	
	/*
	 * 获取商品id（不知道干嘛用）
	 */
	public List<PageData> goodsList(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.goodsList", pd);
	}
   
	
 	
	/*
	* 新增购物车
	*/
	public void saveShop(PageData pd)throws Exception{
		dao.save("XJTShopCarMapper.saveShop", pd);
	}

	/*
	 * 更新购物车
	 */
	public void updateshop(PageData pd)throws Exception{
		dao.update("XJTShopCarMapper.updateshop", pd);
	}
	
	/*
	* 删除我的购物车
	*/
	public void delShop(PageData pd)throws Exception{
		dao.delete("XJTShopCarMapper.delShop", pd);
	}
 
	/*
	 * 统计我的购物车的数量
	 */
	public  String  shopCarCount(PageData pd)throws Exception{
		return (String)dao.findForObject("XJTShopCarMapper.shopCarCount", pd);
	}
	
 	
	
	/*
	 * 获取最近的一个购物时间:goods_type,member_id
	 */
	public PageData getproximityBuyTime(PageData pd)throws Exception{
		return (PageData)dao.findForObject("XJTShopCarMapper.getproximityBuyTime", pd);
	}
	/*
	 * 统计购物车的总数量:youxuangoods_id，goods_type,member_id
	 */
	public String SumMyShopCarListById(PageData pd)throws Exception{
		return (String)dao.findForObject("XJTShopCarMapper.SumMyShopCarListById", pd);
	}
	
 	/*
	 * 我的购物车列表：youxuangoods_id，goods_type,member_id,store_id
	 */
	public List<PageData> MyShopCarList(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.MyShopCarList", pd);
	}
	
	/*
	 * 获取会员的购物车列表
	 */
	public List<PageData> forMemberShopCart(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.forMemberShopCart", pd);
	}
	
	/*
	 * 通过会员ID获取购物车商家
	 */
	public List<PageData> getShopStoreIdByMember(PageData pd)throws Exception{
		return (List<PageData>)dao.findForList("XJTShopCarMapper.getShopStoreIdByMember", pd);
	}
	
	
	
}

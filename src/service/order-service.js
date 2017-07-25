/*
* @Author: liuyiqiang
* @Date:   2017-07-07 09:17:29
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-25 20:21:59
*/

'use strict';

var _mm = require('util/mm.js');
var _order = {
	//获取商品列表
	getProductList : function(resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/order/get_order_cart_product.do'),
			success : resolve,
			error : reject
		})
	},
	//生成订单
	createOrder : function(shippingId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/create.do'),
			data : {
				shippingId : shippingId
			},
			success : resolve,
			error : reject
		})
	},
	//获取订单列表
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/list.do'),
			data : listParam,
			success : resolve,
			error : reject
		})
	},
	//获取订单详情
	getOrderDetail : function(orderNo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/detail.do'),
			data : {
				orderNo : orderNo
			},
			success : resolve,
			error : reject
		})
	},
	orderCancle : function(orderNo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/cancel.do'),
			data : {
				orderNo : orderNo
			},
			success : resolve,
			error : reject
		})
	}
}

module.exports = _order;
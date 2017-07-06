/*
* @Author: liuyiqiang
* @Date:   2017-06-20 16:07:20
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-06 09:09:27
*/

'use strict';
var _mm = require('util/mm.js');
var _cart = {
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		})
	},
	addToCart : function(productInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/add.do'),
			data 	: productInfo,
			success : resolve,
			error : reject
		})
	},
	getCartList : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/list.do'),
			success : resolve,
			error : reject
		})
	},
	//全选购物车商品
	selectAllProduct : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/select_all.do'),
			success : resolve,
			error : reject
		})
	},
	// 取消全选购物车商品
	unSelectAllProduct : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/un_select_all.do'),
			success : resolve,
			error : reject
		})
	},
	//选中某商品
	selectProduct : function(productId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/select.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject
		})
	},
	//取消选中某商品
	unSelectProduct : function(productId,resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/cart/un_select.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject
		})
	},
	//更改购物车商品数量
	updateProductCount : function(productInfo,resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/cart/update.do'),
			data : productInfo,
			success : resolve,
			error : reject
		})
	},
	//删除商品
	deleteProduct : function(productIds,resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/cart/delete_product.do'),
			data : {
				productIds : productIds
			},
			success : resolve,
			error : reject
		})
	}
};

module.exports = _cart;
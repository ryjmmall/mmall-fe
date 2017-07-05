/*
* @Author: liuyiqiang
* @Date:   2017-07-03 21:20:35
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-05 14:44:14
*/

'use strict';

var _mm = require('util/mm.js');
var _product = {
	//获取list列表
	getProductList		: function(listParam,resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/product/list.do'),
			data : listParam,
			success : resolve,
			error : reject
		})
	},
	//请求商品详细信息
	getProductDetail : function(productId,resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/product/detail.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject
		})
	}

}

module.exports = _product;
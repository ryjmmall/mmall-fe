/*
* @Author: liuyiqiang
* @Date:   2017-07-07 09:23:01
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-07 16:08:12
*/

'use strict';
var _mm = require('util/mm.js');
var _address = {
	//获取地址列表
	getAddressList : function(resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/shipping/list.do'),
			success : resolve,
			error : reject
		})
	},
	//保存地址
	save : function(receiverInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/add.do'),
			data : receiverInfo,
			success : resolve,
			error : reject
		})
	},
	//获取地址信息
	getAddress : function(shippingId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/select.do'),
			data : {
				shippingId : shippingId
			},
			success : resolve,
			error : reject
		})
	},
	updateAddress : function(receiverInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/update.do'),
			data : receiverInfo,
			success : resolve,
			error : reject
		})
	},
	delete : function(shippingId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/del.do'),
			data : {
				shippingId : shippingId
			},
			success : resolve,
			error : reject
		})
	}
}

module.exports = _address;
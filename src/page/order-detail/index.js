/*
* @Author: liuyiqiang
* @Date:   2017-07-25 18:04:12
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-25 20:15:23
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');

var page = {
	data : {
		orderNo : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onload();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancle',function(){
			var $this = $(this);
			if(window.confirm('are you sure?')){
				_order.orderCancle(_this.data.orderNo,function(res){
					_mm.successTips('该订单取消成功');
					_this.loadOrderDetail();
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			
		})
	},
	onload : function(){
		this.loadOrderDetail();
		navSide.init({
			name : 'order-list'
		});
	},
	//加载商品详情
	loadOrderDetail : function(){
		var _this			= this,
			orderDetailHtml = '',
			$wrap			= $('.content'),
			orderNo			= _this.data.orderNo;
		$wrap.html('<div class="loading"></div>');
		_order.getOrderDetail(orderNo,function(res){
			_this.dataFilter(res);
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$wrap.html(orderDetailHtml);
		},function(errMsg){
			$wrap.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		})
	},
	dataFilter : function(data){
		data.needPay  = data.status == 10;
		data.isCanclable = data.status == 10;
	}
}

$(function(){
	page.init();
})
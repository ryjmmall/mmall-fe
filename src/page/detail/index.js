/*
* @Author: liuyiqiang
* @Date:   2017-07-05 10:10:37
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-05 16:05:11
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex 	= require('./index.string');
var _mm				= require('util/mm.js');
var _product		= require('service/product-service.js');
var _cart			= require('service/cart-service.js');

var page = {
	data : {
		productId : _mm.getUrlParam('productId')
	},
	init : function(){
		this.bindEvent();
		this.onload();
	},
	onload : function(){
		//如果没有传入productId，跳回首页
		if(!this.data.productId){
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent 	: function(){
		var _this = this;
		//鼠标移入缩略图时，显示在主图位置
		$(document).on('mouseenter','.p-img-item',function(){
			var $this = $(this),
				path  = '';
			path = $this.find('.p-img').attr('src');
			$('.main-img-con .main-img').attr('src',path);	
		});
		//添加、减少购物车商品数量
		$(document).on('click','.p-count-btn',function(){
			var $this 			= $(this),
				type  			= $this.hasClass('plus') ? 'plus' : 'minus',
				currentValue 	= parseInt($('.p-count').val()),
				newValue     	= 0,
				min 			= 1,
				max				= _this.data.detailInfo.stock;
			//点击加号
			if(type === 'plus'){
				if(currentValue < max){
					newValue = currentValue + 1;
				}else{
					newValue = max;
				}
			}
			//点击减号
			else if(type === 'minus'){
				if(currentValue > min){
					newValue = currentValue - 1;
				}else{
					newValue = min;
				}
			}
			$('.p-count').val(newValue);
		});
		//添加购物车
		$(document).on('click','.btn-submit',function(){
			_cart.addToCart({
				productId : _this.data.productId,
				count     : $('.p-count').val()
			},function(res){
				window.location.href = './result.html?type=cart-add';
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	loadDetail  : function(){
		var productId 	= this.data.productId,
			$pageWrap   = $('.page-wrap'),
			detailHtml 	= '',
			_this		= this;
		// loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求Detail详细信息
		_product.getProductDetail(productId,function(res){
			_this.filter(res);
			// 缓存商品信息
			_this.data.detailInfo = res;
			detailHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(detailHtml);	
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">商品已下架</p>');
		})
	},
	// 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
}

$(function(){
	page.init();
})
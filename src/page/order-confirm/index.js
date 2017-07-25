/*
* @Author: liuyiqiang
* @Date:   2017-07-06 18:09:14
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-07 16:25:41
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var _addressModal = require('./address-modal.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var _cart = require('service/cart-service.js');

var page = {
	data : {
		selectedAddressId : null,
		cartCount : $('.cart-count').text()
	},
	init : function(){
		this.bindEvent();
		this.onload();
	},
	bindEvent : function(){
		var _this = this;
		//选择地址
		$(document).on('click','.address-item',function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		//提交订单
		$(document).on('click','.btn-submit',function(){
			var shippingId = _this.data.selectedAddressId;
			//用户选择地址
			if(shippingId){
				_order.createOrder(shippingId,function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}else{
				_mm.errorTips('请选择地址后再提交');
			}
		});
		//添加新地址
		$(document).on('click','.address-new',function(){
			//点击添加新地址，显示弹出层
			_addressModal.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
		});
		//编辑地址
		$(document).on('click','.address-edit',function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				_addressModal.show({
					isUpdate : true,
					onSuccess : function(){
						_this.loadAddressList();
					},
					data : res
				});
			},function(errMsg){
				_mm.errorTips('没有获取到地址信息');
			});
		});
		//删除地址
		$(document).on('click','.address-delete',function(){
			var shippingId = $('.address-item').data('id');
			if(window.confirm('确认要删除吗？')){
				_address.delete(shippingId,function(res){
					_this.loadAddressList();
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}			
		})
	},
	onload : function(){
		this.loadAddressList();
		this.loadProductList();
	},
	//加载商品列表
	loadProductList : function(){
		var htmlProduct = '';
		//loading
		$('.product-con').html('<div class="loading"></div>');
		//获取商品列表
		if(this.data.cartCount !== 0){
			_order.getProductList(function(res){
				htmlProduct = _mm.renderHtml(templateProduct,res);
				$('.product-con').html(htmlProduct);
			},function(errMsg){
				$('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
			});
		}else{
			$('.product-con').html('<p class="err-tip">请添加商品后再提交</p>');
		}

	},
	//加载地址列表
	loadAddressList : function(){
		var htmlAddress = '',
			_this = this,
			$addressCon = $('.address-con');
		$addressCon.html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			htmlAddress = _mm.renderHtml(templateAddress,res);
			$addressCon.html(htmlAddress);
		},function(errMsg){
			$addressCon.html('<p class="err-tip">地址列表加载失败，请刷新后重试</p>');
		});
	},
	addressFilter : function(data){
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for(var i=0, iLength=data.list.length; i < iLength; i++){
				if(data.list[i].id === this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			}
			// 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
		}
	}
}

$(function(){
	page.init();
})
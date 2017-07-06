
/*
* @Author: liuyiqiang
* @Date:   2017-07-05 16:36:58
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-06 09:10:48
*/

'use strict';
require('./index.css');
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {

	},
	init : function(){
		this.bindEvent();
		this.onload();
	},
	bindEvent : function(){
		var _this = this;
		// 全选和取消全选
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}else{
				_cart.unSelectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}
		});
		//选中和取消选中
		$(document).on('click','.cart-select',function(){
			var $this  = $(this);
			var productId = $this.parents('.cart-table').data('productId');
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}else{
				_cart.unSelectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}
		});
		//更改商品数量
		$(document).on('click','.cell-count-btn',function(){
			var $this = $(this),
				$cellCountInput = $this.siblings('.cell-count-input'),
				currentValue = parseInt($cellCountInput.val()),
				newValue = 0,
				maxCount = parseInt($('.cell-count-input').data('max')),
				minCount = 1,
				productId = $this.parents('.cart-table').data('productId'),
				type = $this.hasClass('plus') ? 'plus' : 'minus';
			// 点击加号
			if(type === 'plus'){
				if(currentValue < maxCount){
					newValue = currentValue + 1;
					$cellCountInput.val(newValue);
					_cart.updateProductCount({
						productId : productId,
						count : newValue
					},function(res){
						_this.renderCart(res);
					},function(errMsg){
						_this.showCartError();
					})
				}
			}else if(type === 'minus'){
				if(currentValue > minCount){
					newValue = currentValue - 1;
					$cellCountInput.val(newValue);
					_cart.updateProductCount({
						productId : productId,
						count : newValue
					},function(res){
						_this.renderCart(res);
					},function(errMsg){
						_this.showCartError();
					})
				}	
			}
		});
		//删除单个商品,将productId传入即可
		$(document).on('click','.cart-delete',function(){
			if(window.confirm("确认要删除该商品？")){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//删除选中商品
		$(document).on('click','.delete-selected',function(){
			var arrProductId = [];
			var selectLength = $('.cart-select:checked').length;
			if(window.confirm('确认要删除选中商品？')){
				//将选中的商品id加入数组
				for(var i=0; i< selectLength; i++){
					var productId = $($('.cart-select')[i]).parents('.cart-table').data('product-id');
					arrProductId.push(productId);
				}
				if(arrProductId.length){
					_this.deleteCartProduct(arrProductId.join(','));
				}else{
					_mm.errorTips('您还没有选中任何商品');
				}	
			}
		});

	},
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	},
	onload : function(){
		this.loadCart();
	},
	loadCart : function(){
		var _this = this;
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	},
	renderCart : function(data){
		this.filter(data);
		// 缓存购物车信息
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航的购物车更新数量
        nav.loadCartCount();
	},
	// 数据匹配 查看购物车是否为空
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //购物车加载失败
    showCartError : function(){
    	$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
}

$(function(){
	page.init();
})


/*
* @Author: liuyiqiang
* @Date:   2017-06-20 14:31:17
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-20 16:12:51
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
	init		: function(){
		/*初始化时i，需要获取用户信息，购物车信息以及绑定事件
		*要模块输出时完成模块的初始化，因此module.exports = nav.init();
		*初始化之后，返回的还是nav对象本身，因此需要return this		
		*/
		this.loadUserInfo();
		this.loadCartCount();
		this.bindEvent();
		return this;
	},
	bindEvent	: function(){
		// 绑定登录事件
		$('.js-login').on('click',function(){
			//跳转到登录页面  util mm.js
			_mm.doLogin();
		});
		//注册事件
		$('.js-register').on('click',function(){
			window.location.href = './register.html';
		})
		// 退出事件
		$('.js-logout').on('click',function(){
			_user.logout(function(res){
				//刷新当前页面即可
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			})
		})
	},
	/*加载用户信息*/
	loadUserInfo : function(){
		// 先检查用户登录状态
		_user.checkLogin(function(res){
			$('.nav .not-login').hide().subling('.user .login').show()
				.find('.username').text(res.username);
		},function(errMsg){
			//do nothing
		})	
	},
	/*加载购物车数量*/
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$('.nav .cart-count').text(0);
		})	
	}
}

module.exports = nav.init();
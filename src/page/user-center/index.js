
/*
* @Author: liuyiqiang
* @Date:   2017-06-22 12:34:47
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-22 23:10:48
*/
/*用户中心*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');


var page = {
	init : function(){
		this.onload();
	},
	//加载侧边导航信息和用户信息
	onload : function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		//获取用户信息，成功后，渲染页面
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};

$(function(){
	page.init();
});

/*
* @Author: liuyiqiang
* @Date:   2017-06-20 15:47:07
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-23 13:56:13
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	//退出登录
	logout		: function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	// 检查登录状态
	checkLogin : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	//登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/login.do'),
			data : userInfo,
			method : 'POST',
			success: resolve,
			error : reject
		})
	},
	//检查用户名是否存在
	checkUsername : function(username,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/check_valid.do'),
			data : {
				str : username,
				type : 'username'
			},
			method : 'POST',
			success: resolve,
			error : reject
		})
	},
	//注册
	register : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/register.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		})
	},
	//获取用户提示问题
	getQuestion : function(username,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_get_question.do'),
			method : 'POST',
			data : {
				username : username
			},
			success : resolve,
			error : reject
		})
	},
	//获取用户信息
	getUserInfo : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_information.do'),
			method : 'POST',
			success : resolve,
			error : reject			
		})
	},
	//修改个人信息
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/update_information.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject			
		})
	},
	//修改密码
	updatePassword : function(userInfo,resolve,reject){
			_mm.request({
			url : _mm.getServerUrl('/user/reset_password.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject			
		})
	},
	//忘记密码时确认提示问题的答案
	checkAnswer : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_check_answer.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject			
		})
	},
	resetPassword : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_reset_password.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject			
		})
	}

}

module.exports = _user;
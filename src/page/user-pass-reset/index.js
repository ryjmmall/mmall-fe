/*
* @Author: liuyiqiang
* @Date:   2017-06-22 10:47:05
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-23 13:54:27
*/
/*找回密码页面*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.error-msg').text('');
    }
};


var page = {
	data : {
		username : '',
		answer: '',
		question : '',
		token : ''
	},
	init : function(){
		this.onload();
		this.bindEvent();

	},
	onload : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名后下一步按钮的点击
		$('#submit-username').on('click',function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				})
			}else{
				formError.show('用户名不能为空');
			}
		});
		//输入答案后，点击下一步按钮
		$('#submit-answer').on('click',function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				})
			}else{
				formError.show('答案不能为空');
			}
		});
		//输入新密码，点击提交
		$('#submit-password-new').on('click',function(){
			var passwordNew = $.trim($('#password-new').val());
			alert(passwordNew);
			if(passwordNew && passwordNew.length >= 6){
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : passwordNew,
					forgetToken : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errmsg){
					formError.show(errMsg);
				})

			}else{
				formError.show('不能输入小于6位的新密码');
			}
		});
	},
	//加载第一步输入用户名
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载第二部，输入答案
	loadStepQuestion : function(){
		formError.hide();
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	loadStepPassword : function(){
		formError.hide();
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
};

$(function(){
	page.init();
})
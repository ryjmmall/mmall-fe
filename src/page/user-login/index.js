/*
* @Author: liuyiqiang
* @Date:   2017-06-19 15:59:57
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-22 09:03:19
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');


//表单错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.error-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.error-msg').text();
	}
}

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$('#submit').on('click',function(){
			//提交信息
			_this.submit();
		});
		$('.user-content').on('keyup',function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},
	//提交表单
	submit : function(){
		//获取表单数据
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		};
		//对表单数据做校验
		var validateResult = this.formValidate(formData);
		//验证通过
		if(validateResult.status){
			//调用service层的login方法
			_user.login(formData,function(res){
				//成功直接跳转
				window.location.href = _mm.getUrlParam('redirect')  || './index.html';
			},function(errMsg){
				//失败显示失败的消息
				formError.show(errMsg);
			});
		}
		//验证未通过
		else{
			formError.show(validateResult.msg);
		}
	},
	//对提交的username和password做表单校验,要返回校验结果
	formValidate : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		//先对username做校验
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		//对password做校验
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//都校验通过
		result.status = true;
		result.msg = '验证通过';
		return result;
	},
};
$(function(){
	page.init();
})

/*
* @Author: liuyiqiang
* @Date:   2017-06-23 09:15:15
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-23 14:11:23
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');


var page = {
	init : function(){
		navSide.init({
			name : 'pass-update'
		});
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password        : $.trim($('#password').val()),
				passwordNew     : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			};
			var validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res, msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}else{
				_mm.errorTips(validateResult.msg);
			}
		})
	},
	validateForm : function(formData){
		var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
	}
};

$(function(){
	page.init();
})
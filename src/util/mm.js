/*
* @Author: liuyiqiang
* @Date:   2017-06-20 09:34:50
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-23 13:02:09
*/

'use strict';
var hogan = require('hogan');
var conf = {
	serverHost : ''
}
/*工具类基本结构，可以将需要的方法写在_mm对象中*/
var _mm = {
	/*网络数据请求功能*/
	request : function(param){
		var _this = this;
		$.ajax({
			type 		: param.method || 'GET',
			url   		: param.url || '',
			dataType 	: param.type || 'json',
			data 		: param.data || '',
			success 	: function(res){
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				/*没有登录状态，需要强制登录*/
				else if(res.status === 10){
					_this.doLogin();
				}
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error 		: function(err){
				typeof param.error === 'function' && param.error(err.statusText);

			}
		});
	},
	/*统一登录处理*/
	doLogin	: function(){
		window.location.href = './user-login.html?redirect='+  encodeURIComponent(window.location.href);
	},
	/*获取服务端数据接口url*/
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	/*获取url参数*/
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	/*渲染HTML模板功能*/
	renderHtml : function(htmlTemplate, data){
		var template = hogan.compile(htmlTemplate),
			result = template.render(data);
		return result;
	},
	/*跳转提示--成功*/
	successTips : function(msg){
		alert(msg || '操作成功');
	},
	/*跳转提示--失败*/
	errorTips : function(msg){
		alert(msg || '操作失败');
	},
	/*验证功能 type分为非空，手机号，邮箱*/
	validate : function(value,type){
		var value = $.trim(value);
		/*非空验证*/
		if(type === 'require'){
			return !!value;
		}
		/*手机号验证*/
		if(type === 'phone'){
			return /^1\d{10}$/.test(value);
		}
		/*邮箱验证*/
		if(type === 'email'){
			return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
		}
	},
	/*返回主页*/
	goHome : function(){
		window.location.href = './index.html';
	}
}
 
module.exports = _mm;
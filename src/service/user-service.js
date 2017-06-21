/*
* @Author: liuyiqiang
* @Date:   2017-06-20 15:47:07
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-20 15:59:41
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	logout		: function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	checkLogin : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	}
}

module.exports = _user;
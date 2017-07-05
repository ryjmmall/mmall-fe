/*
* @Author: liuyiqiang
* @Date:   2017-06-20 16:32:28
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-03 21:15:14
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
/*通用页面头部*/
var header = {
	init : function(){
		this.onload();
		this.bindEvent();
	},
	//input回填
	onload : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮，表单提交
		$('#search-btn').on('click',function(){
			_this.searchSubmit();
		}),
		//按下回车键，表单提交
		$('#search-input').on('keyup',function(e){
			//13是回车键
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	// 搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.goHome();
		}
	}
};
header.init();
/*
* @Author: liuyiqiang
* @Date:   2017-06-21 09:19:12
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-21 10:15:40
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
/*侧边导航navSide*/
var navSide = {
	//默认的option对象，name用来确定哪一条为active，navList确定有哪些导航
	option : {
		name : '',
		navList : [
			{	name : 'user-center',  desc : '个人中心', href : './user-center.html'},
			{	name : 'order-list',   desc : '我的订单', href : './order-list.html'},
			{	name : 'pass-update',  desc : '修改密码', href : './pass-update.html'},
			{	name : 'about',        desc : '关于MMall', href : './about.html'}
		]
	},
	// 需要外部调用，通过传进来的参数，确定哪一条导航是active状态
	init : function(option){
		//合并option
		$.extend(this.option, option);
		this.renderNav();
	},
	// 渲染导航
	renderNav : function(){
		//确定active
		for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if(this.option.name === this.option.navList[i].name){
				this.option.navList[i].isActive = true;
			}
		}
		//将数据渲染出来
		//将htmlTemplate定义在index.string中，渲染的数据就在navList中
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList,
		});
		// 把HTML放入容器
		$('.nav-side').html(navHtml);
	}
}
/*只需要渲染即可*/
module.exports = navSide;
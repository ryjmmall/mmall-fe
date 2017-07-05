/*
* @Author: liuyiqiang
* @Date:   2017-07-03 23:22:14
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-04 10:23:22
*/

'use strict';
require('./index.css');
var templatePagination 	= require('./index.string');
var _mm 				= require('util/mm.js');

// Pagination构造函数
var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container 		: null,
		pageRange 		: 3,
		onSelectPage  	: null,
		pageNum			: 1
	};
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		//当为active 和disabled状态，直接返回
		if($this.hasClass('disabled') || $this.hasClass('active')){
			return;
		}
		typeof _this.option.onSelectPage === 'function' 
					? _this.option.onSelectPage($this.data('value')) : null;
	})
};

//render()渲染分页信息
Pagination.prototype.render = function(userOption){
	//合并option
	this.option = $.extend({}, this.defaultOption, userOption);
	//容器不是一个jQuery对象时，直接返回
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	/*当只有一页时，不进行渲染*/
	if(this.option.pages ===1){
		return;
	}
	//正常渲染
	this.option.container.html(this.getPaginationHtml());
};

/*正常渲染分页的html*/
Pagination.prototype.getPaginationHtml = function(){
	var pgHtml 		= '',
		option 		= this.option,
		pageArray 	= [],
		start     	= option.pageNum - option.pageRange <= 0 
						? 1 : option.pageNum - option.pageRange,
		end 		= option.pageNum + option.pageRange > option.pages
						? option.pages : option.pageNum + option.pageRange;
	// push上一页信息
	pageArray.push({
		name 	: '上一页',
		value 	: option.prePage,
		disabled : !option.hasPreviousPage
	});
	// push显示页码的信息
	for(var i = start; i <= end; i++){
		pageArray.push({
			name   : i,
			value  : i,
			active : i === option.pageNum
		})
	};
	//push下一页信心
	pageArray.push({
		name      : '下一页',
		value	  : option.nextPage,
		disabled  : !option.hasNextPage
	})
	pgHtml = _mm.renderHtml(templatePagination,{
		pageArray : pageArray,
		pageNum   : option.pageNum,
		pages	  : option.pages
	})
	return pgHtml;
};

module.exports = Pagination;
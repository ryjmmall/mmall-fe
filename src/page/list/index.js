/*
* @Author: liuyiqiang
* @Date:   2017-07-03 20:49:44
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-05 10:24:51
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');

var page = {
	data : {
		// 加载list的请求数据
		listParam : {
			keyword 		: _mm.getUrlParam('keyword') || '',
			categoryId      : _mm.getUrlParam('categoryId') || '',
			orderBy			: _mm.getUrlParam('orderBy') || 'default',
			pageNum			: _mm.getUrlParam('pageNum') || 1,
			pageSize		: _mm.getUrlParam('pageSize') || 10
		}
	},
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		$('.sort-item').on('click', function(){
			var $this = $(this);
			// 当排序方式为默认
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings('.sort-item')
						 .removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//当排序方式为价格
			else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item')
					 .removeClass('active asc desc');
				if(!($this.hasClass('asc'))){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		})

	},
	// 加载list列表
	loadList : function(){
		var _this = this;
		var listHtml = '';
		var listParam = this.data.listParam;
		$('.p-list-con').html('<div class="loading"></div>');
		// 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam, function(res){
			listHtml = _mm.renderHtml(templateIndex, {
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage   		: res.nextPage,
				pageNum			: res.pageNum,
				pages     		: res.pages
			});
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}))
	}
}

$(function(){
	page.init();
})
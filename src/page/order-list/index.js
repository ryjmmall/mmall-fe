/*
* @Author: liuyiqiang
* @Date:   2017-07-07 18:24:07
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-25 20:17:35
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var Pagination = require('util/pagination/index.js');
var navSide = require('page/common/nav-side/index.js');
var template = require('./index.string');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');

var page = {
	data : {
		listParam : {
			pageNum : 1,
			pageSize : 5
		}
	},
	init : function(){
		this.onload();
	},
	onload : function(){
		this.loadOrderList();
		navSide.init({
			name : 'order-list'
		});
	},
	//加载订单列表
	loadOrderList : function(){
		var _this = this,
			orderListHtml = '',
			$orderList = $('.order-list-con');
		$orderList.html('<div class="loading"></div>');
		//请求接口，获取数据
		_order.getOrderList(_this.data.listParam,function(res){
			//渲染订单内容
			orderListHtml = _mm.renderHtml(template,res);
			$orderList.html(orderListHtml);
			/*渲染分页信息*/
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
			})
		},function(errMsg){
			$orderList.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		})
	},
	//加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
	}
}

$(function(){
	page.init();
})
/*
* @Author: liuyiqiang
* @Date:   2017-06-19 15:59:48
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-03 18:17:07
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function(){
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	var $slider = $('.banner').unslider({
		dots : true
	});
	$('.banner-con .banner-arrow').on('click',function(){
		var forward = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	})
})


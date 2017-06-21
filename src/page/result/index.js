/*
* @Author: liuyiqiang
* @Date:   2017-06-21 10:20:17
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-21 10:53:03
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	$element.show();
})
/*
* @Author: liuyiqiang
* @Date:   2017-06-20 16:07:20
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-20 16:11:31
*/

'use strict';
var _mm = require('util/mm.js');
var _cart = {
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			method : 'GET',
			success : resolve,
			error : reject
		})
	}
};

module.exports = _cart;
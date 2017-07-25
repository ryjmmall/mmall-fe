/*
* @Author: liuyiqiang
* @Date:   2017-07-07 12:12:18
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-07 16:01:41
*/

'use strict';
var templateModal = require('./address-modal.string');
var _mm = require('util/mm.js');
var _cities = require('util/cities/index.js');
var _address = require('service/address-service.js');

var _addressModal = {
	show : function(option){
		//将参数缓存
		this.option = option;
		this.option.data = option.data || {};
		//渲染模态窗
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//用户选择了省份信息，加载对应的城市信息 二级联动
		$(document).on('change','#receiver-province',function(){
			var provinceName = $(this).val();
			_this.loadCities(provinceName);
		});
		//保存收货地址
		$('.modal-wrap').find('.address-submit').click(function(){
			//获取表单数据，并校验
			var receiverInfo = _this.getReceiverInfo();
			var isUpdate = _this.option.isUpdate;
			//校验通过,且为新增
			if( receiverInfo.status && !isUpdate ){
				_address.save(receiverInfo.data,function(res){
					_mm.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			//校验通过且为编辑时
			else if(receiverInfo.status && isUpdate){
				_address.updateAddress(receiverInfo.data,function(res){
					_mm.successTips('地址更新成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			// 验证不通过
            else{
                _mm.errorTips(receiverInfo.msg || '好像哪里不对了~');
            }
		});
		// 保证点击modal内容区的时候，不关闭弹窗
        $('.modal-wrap').find('.modal-con').click(function(e){
            e.stopPropagation();
        });
		//点击X号,点击蒙版区关闭弹窗
		$('.modal-wrap').find('.close').click(function(){
			_this.hide();
		})
	},
	getReceiverInfo : function(){
		var receiverInfo = {};
		var result = {
			status : false
		};
		//获取表单数据
		receiverInfo.receiverName = $.trim($('#receiver-name').val());
		receiverInfo.receiverProvince = $('#receiver-province').val();
		receiverInfo.receiverCity = $('#receiver-city').val();
		receiverInfo.receiverAddress = $.trim($('#receiver-address').val());
		receiverInfo.receiverPhone = $.trim($('#receiver-phone').val());
		receiverInfo.receiverZip = $.trim($('#receiver-zip').val());
		//如果是更新，需要id
		if(this.option.isUpdate){
            receiverInfo.id  = $('.modal-wrap').find('#receiver-id').data('id');
        }
		//对表单数据做校验
		//收货人姓名
		if(!_mm.validate(receiverInfo.receiverName,'require')){
			result.msg = '收件人姓名不能为空';
			return result;
		}
		if(!_mm.validate(receiverInfo.receiverProvince,'require')){
			result.msg = '省份不能为空';
			return result;
		}
		if(!_mm.validate(receiverInfo.receiverCity ,'require')){
			result.msg = '城市不能为空';
			return result;
		}
		if(!_mm.validate(receiverInfo.receiverAddress,'require')){
			result.msg = '地址不能为空';
			return result;
		}
		if(!_mm.validate(receiverInfo.receiverPhone,'require')){
			result.msg = '手机不能为空';
			return result;
		}
		if(!_mm.validate(receiverInfo.receiverPhone,'phone')){
			result.msg = '手机格式不正确';
			return result;
		}
		result = {
			status : true,
			data : receiverInfo
		}
		return result;
	},
	loadModal : function(){
		//渲染html
		var htmlModal = _mm.renderHtml(templateModal,{
			isUpdate : this.option.isUpdate,
			data : this.option.data
		});
		$('.modal-wrap').html(htmlModal);
		//加载省份信息
		this.loadProvince();
	},
	//加载省份信息
	loadProvince : function(){
		var provinces = [];
		var $selectProvince = $('.modal-wrap').find('#receiver-province');
		provinces = _cities.getProvince();
		var htmlOption = this.renderSeleteOption(provinces);
		$selectProvince.html(htmlOption);
		//如果是更新地址，并且省份信息不为空，则回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$selectProvince.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//加载城市信息
	loadCities : function(provinceName){
		var cities = [];
		var $selectCity = $('.modal-wrap').find('#receiver-city');
		cities = _cities.getCities(provinceName);
		var htmlOption = this.renderSeleteOption(cities);
		$selectCity.html(htmlOption);
		//更新地址 且城市信息不为空
		if(this.option.isUpdate && this.option.data.receiverCity){
			$selectCity.val(this.option.data.receiverCity);
		}
	},
	renderSeleteOption : function(selectArr){
		var htmlOption = '<option value="">请选择</option>';
		for(var i=0, iLength = selectArr.length; i<iLength; i++){
			htmlOption = htmlOption + '<option>'+ selectArr[i] +'</option>';
		}
		return htmlOption;
	},
	hide : function(){
		$('.modal-wrap').empty();
	}
}

module.exports = _addressModal;
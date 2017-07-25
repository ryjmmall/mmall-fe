/*
* @Author: liuyiqiang
* @Date:   2017-06-19 15:56:05
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-07-25 18:06:41
*/

'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*获取html模板参数*/
var getHtmlConfig = function(name,title){
    return {
            template    : './src/view/'+ name +'.html',
            filename    : 'view/'+ name +'.html',
            inject      : true,
            hash        : true,
            chunks      : ['common', name],
            title       : title
        }
}
/*判断是开发模式还是线上模式*/
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
     entry: {
        "common"                : ['./src/page/common/index.js'],
     	"index"                 : ['./src/page/index/index.js'],
        "list"                  : ['./src/page/list/index.js'],
        "detail"                : ['./src/page/detail/index.js'],
        "cart"                  : ['./src/page/cart/index.js'],
        "order-confirm"         : ['./src/page/order-confirm/index.js'],
        "order-list"            : ['./src/page/order-list/index.js'],
        'order-detail'          : ['./src/page/order-detail/index.js'],
     	"user-login"            : ['./src/page/user-login/index.js'],
        "user-register"         : ['./src/page/user-register/index.js'],
        "user-center"           : ['./src/page/user-center/index.js'],
        "user-center-update"    : ['./src/page/user-center-update/index.js'],
        "result"                : ['./src/page/result/index.js'],
        "user-pass-reset"       : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js']
     },
     output: {
         path: './dist',
         publicPath : '/dist',
         filename: 'js/[name].js'
     },
     externals:{
        /*模块化引入jquery方式*/
        'jquery':'window.jQuery'
    },
    plugins : [
        // name: 共享块名称
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 将css单独打包
        new ExtractTextPlugin("css/[name].css"),
        // html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','我的购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','重置密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码'))
    ],
    module : {
        loaders : [
            {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader : 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test : /\.string$/,
                loader : 'html-loader'
            }
        ]
    },
    /*配置别名*/
    resolve : {
        alias : {
            /*__dirname表示当前根目录*/
            'node_modules'  : __dirname + '/node_modules',
            'util'          : __dirname + '/src/util',
            'page'          : __dirname + '/src/page',
            'service'       : __dirname + '/src/service',
            'view'          : __dirname + '/src/view',
        }
    }
 };
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
 }
 module.exports = config;
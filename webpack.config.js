/*
* @Author: liuyiqiang
* @Date:   2017-06-19 15:56:05
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-21 10:24:44
*/

'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*获取html模板参数*/
var getHtmlConfig = function(name,title){
    return {
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            inject : true,
            hash : true,
            chunks : ['common', name],
            title : title
        }
}
/*判断是开发模式还是线上模式*/
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
     entry: {
        "common" : ['./src/page/common/index.js'],
     	"index" : ['./src/page/index/index.js'],
     	"login" : ['./src/page/login/index.js'],
        "result" : ['./src/page/result/index.js']
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
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
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
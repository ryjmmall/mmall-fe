/*
* @Author: liuyiqiang
* @Date:   2017-06-19 15:56:05
* @Last Modified by:   liuyiqiang
* @Last Modified time: 2017-06-19 18:55:46
*/

'use strict';
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*获取html模板参数*/
var getHtmlConfig = function(name){
    return {
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            inject : true,
            hash : true,
            chunks : ['common', name]
        }
}
/*判断是开发模式还是线上模式*/
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var config = {
     entry: {
        "common" : ['./src/page/common/index.js'],
     	"index" : ['./src/page/index/index.js'],
     	"login" : ['./src/page/login/index.js']
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
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
            }
        ]
    }
 };
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
 }
 module.exports = config;
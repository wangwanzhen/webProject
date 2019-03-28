'use strict';
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var config = require('./config/base')
var util = require('./build/util')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ResourceCopyPlugin = require('./build/ResourceCopyPlugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
  return path.posix.join('', _path)
}

const webpackConfig = {
	name: 'runlukeji',
	target: 'web',
	module: {
	  rules: [
	  	{
	        test: /\.js$/,
	        loader: 'babel',
	        query:{
	            presets:['es2015']
	        },
	        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
	    },
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'resource/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] })
		},
		{
			test: /\.styl$/,
			loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader','stylus-loader' ] })
		}
	]
	}
}

webpackConfig.plugins = [
  	new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/[name][hash].js"
    }),
	new UglifyJsPlugin({
	  uglifyOptions: {
	      compress: {
	          warnings: false,
	          drop_debugger: true,
	          drop_console: true
	      }
	  },
	  sourceMap: true,
	  parallel: true
	}),
	new OptimizeCSSPlugin({
	  cssProcessorOptions: {
      safe: true,
      map: {
          inline: false
      }
	  }
	}),
	new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    })
]

webpackConfig.entry = util.entryFiles()

webpackConfig.output = {
  filename: 'js/[name].[hash].js',
  path: config.build,
	publicPath:'../'
}

util.HTMLPLUGINS(webpackConfig.plugins, HtmlWebpackPlugin)
//复制资源 比如图片(js可以通过loader，但是html中的无法引用 ，所以直接拷贝了) favicon.ico图片等
webpackConfig.plugins.push(new ResourceCopyPlugin())

module.exports = webpackConfig
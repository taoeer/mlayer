let path = require("path");
let webpack = require("webpack");
let webpackBaseConfig = require("./webpack.base.config");
let webpackMerge = require("webpack-merge");

let banner = `
	author: taoeer
	mail: 719012229@qq.com
	v: 0.0.1
`;

module.exports = webpackMerge(webpackBaseConfig, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
		new webpack.BannerPlugin(banner, {
			entryOnly: true
		})
	]
})
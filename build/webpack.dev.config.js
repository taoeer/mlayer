let path = require("path");
let webpackBaseConf = require("./webpack.base.config");

Object.keys(webpackBaseConf.entry).map( x=> {
	webpackBaseConf.entry[x].unshift("webpack-dev-server/client?http://localhost:8880/");
});

module.exports = webpackBaseConf

let path = require("path");

module.exports = {
	entry: {
		mlayer: ["./src/mlayer.js"]
	},
	output: {
		path: path.resolve(__dirname , "../dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: "babel"},
			{test: /\.less$/, loader: "style!css!postcss!less"},
			{
			  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			  loader: 'url',
			  query: {
			    limit: 10000,
			    name: 'img/[name].[hash:7].[ext]'
			  }
			}
		]
	},
	babel: {
		presets: ["es2015"]
	}
}
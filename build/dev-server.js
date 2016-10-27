let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
let config = require("./webpack.dev.config");

let compiler = webpack(config);
let server = new webpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});
server.listen(8880);
var webpack  = require("webpack");
var webpackConfig = require("./webpack.dev.config");
var WebpackDevServer = require("webpack-dev-server");
var config = require('./server/config');


var front_server = new WebpackDevServer(webpack(webpackConfig), {
  proxy: {
    "*" : `http://localhost:${config.port}`
  },
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false
  }
});

front_server.listen(config.browsersync_port, '0.0.0.0');


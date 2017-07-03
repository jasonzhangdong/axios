var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./server/config');

var publicPath = 'http://localhost';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


var devConfig = {
  cache: true,
  devtool: 'inline-eval-cheap-source-map',
  //devtool: 'source-map',
  entry: getEntry(),
  output: {
    path: path.resolve('./dist'),
    publicPath: publicPath,
    filename: './[name]/bundle.js',
    library: 'EntryPoint'
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    // {
    //     test: /\.(png|jpg)$/,
    //     loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
    // }, 
    {
      test: /\.html$/,
      loader: "html?-minimize"  
    },
    {
      //test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //loader: 'file-loader?name=fonts/[name].[ext]'
      test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },  
    {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
    }, 
    {
      loader: 'babel-loader',
      include: [path.resolve(__dirname, "client")],
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components|ueditor)/,
      query: {
        plugins: [['transform-runtime'], ['import', [{ 'libraryName': 'antd', 'style': 'css' }]]],
        presets: ['es2015', 'stage-0', 'react']
      }
    }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ 
      $               : 'jquery',
      'jQuery'        : 'jquery',
      'window.jQuery' : 'jquery',
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./[name]/bundle.css"),
    new webpack.DllReferencePlugin({
      //context: __dirname,
      //manifest: require('./dist/vendor-manifest.json')
      context: __dirname,
      manifest: require(path.resolve(__dirname, './client/vendor-manifest.json'))
    })
  ],
  resolve: {
    root: [
      process.cwd() + '/client', 
      process.cwd() + '/node_modules', 
    ],
    extensions: ['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg'],
    alias: {}
  }
};

function getFileMap(globPath, pathDir, fileName) {
  var result = {};
  var entry, dirname, basename, pathname, extname;

  var files = glob.sync(globPath);

  for (var i = 0; i < files.length; i++) {  
    entry    = files[i];
    dirname  = path.dirname(entry);
    extname  = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    pathname = fileName ? pathname.replace(new RegExp(fileName + '$'), '') : pathname;


    result[pathname] = ['./' + entry];
  }

  return result;
}

function getEntry() {
  var pages = Object.keys(getFileMap('views/**/*.html', 'views/'));
  var jss = getFileMap('client/js/**/index.js', 'client/js/', '/index');

  var result = {};
  var entry;

  pages.forEach(function(page) {
    if (page in jss) {
      entry = jss[page];
      //entry.push(hotMiddlewareScript);
      entry.unshift("webpack-dev-server/client?http://localhost:" + config.browsersync_port + "/");
      entry.unshift("webpack/hot/dev-server");

      result[page] = entry;
    }
  });

  return result;
}

module.exports = devConfig;

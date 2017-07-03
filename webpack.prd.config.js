var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var fs = require('fs-extra');

var productionConfig = {
  entry: getEntry(),
  output: {
    path : path.resolve('./dist'),
    publicPath : '/',
    filename : './[name]/bundle.js',
    library : 'EntryPoint'
  },
  module: {
    loaders: [
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    //{
      //test: /\.(png|jpg)$/,
      //loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
    //}, 
    {
      test: /\.html$/,
      loader: "html?-minimize"	
    },
    {
      //test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //loader: 'file-loader?name=fonts/[name].[ext]'
      test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      //loader : 'file-loader'
      loader: 'file-loader?name=fonts/[name].[ext]'
    }, 
    {
      test: /\.(png|jpe?g|gif)$/,
      //loader: 'url-loader?limit=8192&name=imgs/[name]-[hash].[ext]'
      loader: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
    }, 
    {
      loader: 'babel-loader',
      include: [path.resolve(__dirname, "client")],
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components|ueditor)/,
      query: {
        plugins: [['transform-runtime'], ['import', [{ 'libraryName': 'antd', 'style': 'css' }]]],
        presets: ['es2015', 'stage-0', 'react'],
      }
    }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ 
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("./[name]/bundle.css"),
    new UglifyJsPlugin({ 
      compress: {
        warnings: false
      },
      //except: ['$super', '$', 'exports', 'require'], 
      sourceMap: false,
      minimize: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(__dirname, './client/vendor-manifest.json'))
    })
  ],
  resolve: {
    root: [
      process.cwd() + '/client', 
      process.cwd() + '/node_modules',
      process.cwd() + '/node_modules/bootstrap/dist/css',
      process.cwd() + '/node_modules/bootstrap/dist/js',
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
  copyPlugins();

  var pages = Object.keys(getFileMap('views/**/*.html', 'views/'));
  var jss = getFileMap('client/js/**/index.js', 'client/js/', '/index');

  var result = {};
  var entry;

  pages.forEach(function(page) {
    if (page in jss) {
      entry = jss[page];
      result[page] = entry;
    }
  });

  return result;
}

function copyPlugins() {
  fs.removeSync('dist/');
  fs.mkdirsSync('dist/');
  fs.copySync('client/assets', 'dist/assets');
  fs.copySync('client/vendor-manifest.json', 'dist/vendor-manifest.json');
  fs.copySync('client/vendor.dll.js', 'dist/vendor.dll.js');
}

module.exports = productionConfig;


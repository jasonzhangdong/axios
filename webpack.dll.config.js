var path = require('path');  
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {  
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'client'),
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, 'client', '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到哪个全局变量上
       * 和 output.library 一样即可。 
       */
      name: '[name]_library',
      
    }),

    new UglifyJsPlugin({ 
      output: {
        comments: false 
      },
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require'], 
      sourceMap: false,
      minimize: true,
    }),

    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};

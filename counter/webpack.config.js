var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/');

module.exports = {
  entry: APP_DIR + '/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js?/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3131
  }
};
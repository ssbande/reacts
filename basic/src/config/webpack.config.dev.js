const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	resolve: {
    extensions: ['*', '.js', '.jsx']
	},
	entry: './src/index.js',
	output: {
		path: __dirname + './../../dist',
		publicPath: '/',
		filename: 'main.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'Basic',
			template: './src/config/template.html'
		})
  ],
	devServer: {
		contentBase: './dist',
		port: 9595,
		open: true,
		hot: true
	},
	module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']
			}
    ]
  }
}
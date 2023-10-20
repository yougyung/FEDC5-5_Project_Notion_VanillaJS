const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	resolve: {
		extensions: ['.js'],
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@component': path.resolve(__dirname, 'src/component'),
			'@layout': path.resolve(__dirname, 'src/layout'),
			'@util': path.resolve(__dirname, 'src/util'),
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},
	devtool: 'eval',
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|svg)$/i,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new MiniCssExtractPlugin()],
};

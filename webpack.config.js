const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	mode: 'development',
	entry: './src/main.js',
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
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
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

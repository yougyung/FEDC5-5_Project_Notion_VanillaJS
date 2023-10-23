const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = (_env, argv) => {
  return {
    devtool: argv.mode === 'development' && 'eval-cheap-source-map',

    entry: './src/index.js',

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      clean: true,
    },

    devServer: {
      port: 3000,
      host: 'localhost',
      hot: true,
      historyApiFallback: true,
    },

    resolve: {
      alias: {
        '@': path.resolve('./src/'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: path.join(__dirname, 'index.html'),
      }),

      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};

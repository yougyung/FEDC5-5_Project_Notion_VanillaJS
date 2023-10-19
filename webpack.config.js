const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (_env, argv) => {
  return {
    devtool: argv.mode === 'development' && 'eval-cheap-source-map',

    entry: './src/index.js',

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },

    devServer: {
      port: 3000,
      host: 'localhost',
      hot: true,
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
    ],
  };
};

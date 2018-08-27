require('dotenv').config();
require('babel-polyfill');
const path = require('path');

// const { createReadStream } = require('fs');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,

  mode: isProduction ? 'production' : 'development',

  entry: ['babel-polyfill', './src/index.js'],

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devtool: isProduction ? 'source-map' : 'inline-source-map',

  resolve: {
    modules: [path.resolve('./src/'), path.resolve('./node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: HtmlTemplatePlugin,
      inject: false,
      mobile: true,
      appMountId: 'root'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
        API_MODE: `"${process.env.API_MODE}"`
      }
    }),
    isProduction && new BundleAnalyzerPlugin()
  ].filter(Boolean),

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 9000
    // before(app) {
    // app.get('/api/providers', function(req, res) {
    //   res.writeHead(200, { 'Content-Type': 'application/json' });
    //   createReadStream(path.join(__dirname, 'src/api/providers.json'), {
    //     encoding: 'utf-8'
    //   }).pipe(res);
    // });
    // }
  }
};

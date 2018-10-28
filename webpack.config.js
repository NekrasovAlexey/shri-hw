var webpack = require('webpack');
var path = require('path');

// variables
var sourcePath = path.join(__dirname, './client');
var outPath = path.join(__dirname, './build/client');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  context: sourcePath,
  entry: './index.ts',
  output: {
    path: outPath,
    filename: 'index.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      // .ts
      {
        test: /\.ts?$/,
        use: 'ts-loader'
      },
      // static assets
      {
        test: /\.(json|css)$/,
        use: {
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
        },
      },
      {
          test: /\.(svg|png|jpg)$/,
          use: {
              loader: 'file-loader',
              options: {
                  name: 'assets/[name].[ext]'
              }
          },
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

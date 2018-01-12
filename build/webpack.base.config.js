'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const config = require('config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const util = require('./util')
const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, dir)

chalk.enabled = true
fs.writeFileSync(resolve('../views/config.json'), JSON.stringify(config.fe))
module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: config.get('fe.publicPath'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'pages': resolve('../views/pages'),
      'components': resolve('../views/components'),
      'config': resolve('../views/config.json')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize&importLoaders=1!postcss-loader',
            fallback: 'vue-style-loader'
          })
          : [
            'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
      },
      {
        test: /\.snippets/,
        loader: 'raw-loader'
      },
      {
        test: /\.md/,
        loader: 'vue-markdown-loader',
        options: util.markdown
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
    ]
    : [
      new FriendlyErrorsPlugin()
    ]
}

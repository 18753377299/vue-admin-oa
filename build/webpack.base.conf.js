'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 页面入口文件配置
  entry: {
    vendor: ['./src/assets/js/SuperMap.Include','./src/assets/js/SuperMap_Basic-8.1.1-15523',
      './src/assets/js/SuperMap_Cloud-8.1.1-15523','./src/assets/js/SuperMap_IServer-8.1.1-15523',
      './src/assets/js/SuperMap_OGC-8.1.1-15523', './src/assets/js/SuperMap_Visualization-8.1.1-15523',
      './src/assets/js/SuperMap-8.1.1-15523'],
    app: './src/main.js'
  },
  // 入口文件输出配置
  output: {
    path: config.build.assetsRoot,  // 输出目录
    filename: '[name].js',
    // 设置输出文件名字，此例中为入口文件名字加上
    // hash 值。使用 hash 值的原因是生成新文件后避免缓存导致用户没有更新到新的 js 文件
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // plugins 为 webpack 的插件功能，可利用一些第三方插件完成一些额外的操作
  // 例如 HtmlWebpackPlugin，这个插件可以帮助生成 HTML 文件，在 body 元素中使用script 来引用 output 中最后输出的 js 文件
  plugins: [
    // 该条如果不删掉，会导致打包不成功
    // new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
}

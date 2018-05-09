const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { base, workspace } = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(base(false), {
  mode: 'production',
  entry: {
    app: resolve(workspace, 'client', 'index.js')
  },
  output: {
    path: resolve(workspace, 'public', 'generated'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
})

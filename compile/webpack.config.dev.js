const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { base, workspace } = require('./webpack.base.config')

module.exports = merge(base(true), {
  mode: 'development',
  entry: {
    app: ['webpack-hot-middleware/client', resolve(workspace, 'client', 'index.js')]
  },
  output: {
    path: resolve(workspace, 'public', 'generated'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

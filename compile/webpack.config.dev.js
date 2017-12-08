const { resolve } = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const root = resolve(__dirname, '..')

module.exports = merge(base(true), {
  entry: {
    app: ['webpack-hot-middleware/client', resolve(root, 'client', 'index.js')]
  },
  output: {
    path: resolve(root, 'public', 'assets'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  devtool: 'source-map'
})

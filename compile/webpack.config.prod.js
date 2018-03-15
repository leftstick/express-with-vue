const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const root = resolve(__dirname, '..')

module.exports = merge(base(false), {
  mode: 'production',
  entry: {
    app: resolve(root, 'client', 'index.js')
  },
  output: {
    path: resolve(root, 'public', 'assets'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
})

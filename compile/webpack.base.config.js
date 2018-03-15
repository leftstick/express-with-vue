const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = resolve(__dirname, '..')

module.exports = function(isDev) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          enforce: 'pre',
          test: /\.vue$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {
                  postcss: 'vue-style-loader!css-loader!postcss-loader' + (isDev ? '?sourceMap=true' : '')
                },
                preserveWhitespace: false
              }
            }
          ]
        },
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)\w*/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      modules: [resolve(root, 'node_modules'), root, resolve(root, 'client')],
      extensions: ['.js', '.vue']
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(root, 'client', 'index.html'),
        favicon: resolve(root, 'client', 'img', 'favicon.ico'),
        hash: false
      })
    ]
  }
}

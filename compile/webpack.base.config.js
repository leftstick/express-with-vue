const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer-stylus')

const root = resolve(__dirname, '..')

module.exports.workspace = resolve(__dirname, '..')

module.exports.base = function(isDev) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: (!isDev ? [MiniCssExtractPlugin.loader] : ['vue-style-loader']).concat(['css-loader'])
        },
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          use: ['eslint-loader']
        },
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                use: [autoprefixer()]
              }
            }
          ]
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff|eot|woff2)$/,
          use: ['url-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue']
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(root, 'client', 'index.html'),
        favicon: resolve(root, 'client', 'img', 'favicon.ico'),
        hash: false
      })
    ]
  }
}

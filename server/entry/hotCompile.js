const { join } = require('path')

const envUtil = require('../core/util/env')

module.exports = function(app) {
  if (envUtil.isProduction) {
    return
  }
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../../compile/webpack.config.dev')
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunkModules: false
    }
  })

  const assetPath = join(__dirname, '..', '..', 'public', 'assets', 'index.html')

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get(/^(?!\/api).+/, function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(assetPath))
    res.end()
  })
}

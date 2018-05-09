const express = require('webpack')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../../compile/webpack.config.dev')

const { isDev } = require('../assistant/utils/env')
const { ONE_WEEK_MILLI_SECONDS } = require('../assistant/utils/time')
const { resolveFromRoot } = require('../assistant/utils/path')

module.exports.initIndexPageEntry = function(app) {
  if (isDev) {
    return setupDevEntry(app)
  }
  return setupProductionEntry(app)
}

function setupDevEntry(app) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunkModules: false
    }
  })

  const assetPath = resolveFromRoot('public', 'generated', 'index.html')

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get(/^(?!\/api).+/, function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(assetPath))
    res.end()
  })
}

function setupProductionEntry(app) {
  const assetsPath = resolveFromRoot('public', 'generated')

  app.use(
    express.static(assetsPath, {
      maxAge: ONE_WEEK_MILLI_SECONDS
    })
  )

  app.get(/^(?!\/api).+/, function response(req, res) {
    res.append('Cache-Control', 'no-cache')
    res.sendFile(resolveFromRoot(assetsPath, 'index.html'))
  })
}

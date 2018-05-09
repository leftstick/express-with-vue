const express = require('express')
const favicon = require('serve-favicon')
const { isDev } = require('../assistant/utils/env')
const { resolveFromRoot } = require('../assistant/utils/path')
const { ONE_WEEK_MILLI_SECONDS } = require('../assistant/utils/time')

const serve = function(staticPath, cache) {
  return express.static(resolveFromRoot(staticPath), {
    maxAge: cache && !isDev ? ONE_WEEK_MILLI_SECONDS : 0
  })
}

module.exports.initStaticAssetsHandler = function(app) {
  app.use(favicon(resolveFromRoot('public/assets/icons/favicon.ico')))
  app.use('/public', serve('public', true))
}

const express = require('express')
const { resolve } = require('path')
const envUtil = require('../core/util/env')
const { ONE_DAY } = require('../core/util/constant')

module.exports = function(app) {
  if (envUtil.isDev) {
    return
  }

  const assetsPath = resolve(__dirname, '..', '..', 'public', 'assets')

  app.use(
    express.static(assetsPath, {
      maxAge: ONE_DAY * 7
    })
  )

  app.get(/^(?!\/api).+/, function response(req, res) {
    res.append('Cache-Control', 'no-cache')
    res.sendFile(resolve(assetsPath, 'index.html'))
  })
}

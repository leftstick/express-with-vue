const express = require('express')
const path = require('path')

const { ONE_DAY } = require('../util/constant')

module.exports = function(app) {
  app.use(
    express.static(path.resolve(__dirname, '..', '..', '..', 'public'), {
      maxAge: ONE_DAY * 7
    })
  )
}

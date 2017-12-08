const requestBody = require('./requestBody')
const proxy = require('./proxy')
const cookie = require('./cookie')
const serveStatic = require('./serveStatic')

module.exports = function(app) {
  proxy(app)
  requestBody(app)
  cookie(app)
  serveStatic(app)
}

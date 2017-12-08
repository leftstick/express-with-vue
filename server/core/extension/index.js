const addLaunch = require('./express_launch')
const addRequestField = require('./express_request_field')
const addResponseCache = require('./express_response_cache')
const addResponseSend = require('./express_response_send')

module.exports = function(app) {
  addLaunch(app)
  addRequestField(app)
  addResponseSend(app)
  addResponseCache(app)

  return app
}

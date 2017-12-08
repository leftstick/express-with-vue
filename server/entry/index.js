const hotCompile = require('./hotCompile')
const serveIndex = require('./serveIndex')

module.exports = function(app) {
  hotCompile(app)
  serveIndex(app)
}

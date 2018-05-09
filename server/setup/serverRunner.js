const { server } = require('../../env')

module.exports.initServerRunner = function(app) {
  return new Promise(resolve => {
    const webContainer = app.listen(server.port, '0.0.0.0', () => {
      return resolve(`server started at ${server.port}`)
    })
    // fix slow network issue
    webContainer.keepAliveTimeout = 60000 * 2
  })
}

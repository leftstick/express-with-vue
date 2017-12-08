const config = require('../../../env')

module.exports = function(app) {
  app.launch = function() {
    return new Promise((resolve, reject) => {
      app.listen(config.server.port, '0.0.0.0', err => {
        if (err) {
          return reject(err)
        }
        console.log(`Express server listening on port ${config.server.port}`)
        resolve()
      })
    })
  }
}

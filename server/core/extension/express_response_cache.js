module.exports = function(app) {
  app.response.cacheFor = function(time) {
    return this.append('Cache-Control', `max-age=${time}`)
  }
}

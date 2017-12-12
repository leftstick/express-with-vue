module.exports = function(app) {
  app.response.sendApi = function(data) {
    const result = { data }
    if (this.ctx.isEnabled()) {
      result.performance = this.ctx.resolve()
    }
    this.json(result)
  }

  app.response.sendServerError = function(err) {
    this.sendError(500, {
      name: err.name,
      message: `${err.message}`
    })
  }

  app.response.sendError = function(code, err) {
    this.status(code).json({
      error: {
        name: err.name,
        message: err.message
      }
    })
  }
}

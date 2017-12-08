const { isArray } = require('../util/Object')

module.exports = function(app) {
  app.request.fields = function() {
    const fields = []

    if (this.get('fields')) {
      fields.push(
        ...this.get('fields')
          .split(',')
          .map(f => f.trim())
      )
    } else if (isArray(this.query.fields) && this.query.fields.length > 0) {
      fields.push(...this.query.fields)
    }

    fields.sort()
    return fields
  }
}

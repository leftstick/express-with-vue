const ExtendableError = require('./ExtendableError')

class InjectorError extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

module.exports = InjectorError

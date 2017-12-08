const ExtendableError = require('./ExtendableError')

class InvalidParamsError extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

module.exports = InvalidParamsError

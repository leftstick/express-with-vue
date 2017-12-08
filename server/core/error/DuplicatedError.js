const ExtendableError = require('./ExtendableError')

class DuplicatedError extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

module.exports = DuplicatedError

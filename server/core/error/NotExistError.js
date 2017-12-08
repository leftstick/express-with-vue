const ExtendableError = require('./ExtendableError')

class NotExist extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

module.exports = NotExist

module.exports.debounce = function(func, wait, immediate) {
  let timeout
  return function() {
    const _this = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        func.apply(_this, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(_this, args)
    }
  }
}

module.exports.promisify = function(func) {
  if (!func) {
    return Promise.resolve()
  }
  return function(...args) {
    return new Promise(function(resolve, reject) {
      try {
        const res = func(...args)
        if (res && res.then) {
          return res.then(resolve, reject)
        }
        return resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports.skipUnderline = function(file) {
  return file.indexOf('_') !== 0 && file.indexOf('.') !== 0
}

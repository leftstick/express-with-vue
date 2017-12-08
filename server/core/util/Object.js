const { reap } = require('safe-reaper')

const isNull = obj => obj === null || obj === undefined

const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'

const hasArrayAccess = key => /\[[0-9]+\]$/.test(key)

const eraseGetter = obj => obj && JSON.parse(JSON.stringify(obj))

module.exports.hasArrayAccess = hasArrayAccess

module.exports.get = (obj, key, defaultVal) => {
  const val = reap(obj, key, defaultVal)
  return eraseGetter(val)
}

module.exports.clone = function clone(obj) {
  if (isNull(obj) || Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  // Handle Array
  if (obj instanceof Array) {
    return obj.map(o => clone(o))
  }

  if (obj instanceof Object) {
    /* eslint-disable */
    return Object.keys(obj).reduce((p, c) => ((p[c] = clone(obj[c])), p), {})
  }
}

module.exports.pick = function(obj, fields) {
  if (!obj) {
    return null
  }

  const val = {}
  const keys = Object.keys(obj)

  /* eslint-disable */
  return keys.filter(key => fields.indexOf(key) > -1).reduce((p, c) => ((p[c] = obj[c]), p), val)
}

module.exports.omit = function(obj, fields) {
  const val = {}

  if (!obj) {
    return val
  }

  const keys = Object.keys(obj)

  /* eslint-disable */
  return keys.filter(key => fields.indexOf(key) < 0).reduce((p, c) => ((p[c] = obj[c]), p), val)
}

module.exports.pickNotEmpty = function(obj) {
  const val = {}

  if (!obj) {
    return val
  }

  const keys = Object.keys(obj)

  /* eslint-disable */
  return keys.filter(key => obj[key]).reduce((p, c) => ((p[c] = obj[c]), p), val)
}

module.exports.isString = str => Object.prototype.toString.call(str) === '[object String]'

module.exports.isBoolean = bool => Object.prototype.toString.call(bool) === '[object Boolean]'

module.exports.isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'

module.exports.isDate = obj => Object.prototype.toString.call(obj) === '[object Date]'

module.exports.isArray = isArray

module.exports.isNull = isNull

module.exports.eraseGetter = eraseGetter

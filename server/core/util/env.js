module.exports.isProduction = process.env.NODE_ENV === 'production'

module.exports.isDev = process.env.NODE_ENV !== 'production'

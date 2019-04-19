const express = require('express')
const { withExpressApp } = require('express-api-loader')

const { initIndexPageEntry } = require('./server/setup/entry')
const { initStaticAssetsHandler } = require('./server/setup/staticAssets')
const { initRequestBodyParser } = require('./server/setup/requestBody')
const { initCookieParser } = require('./server/setup/cookie')
const { initServerRunner } = require('./server/setup/serverRunner')

const { resolveFromRoot } = require('./server/assistant/utils/path')

const app = express()

initStaticAssetsHandler(app)
initRequestBodyParser(app)
initCookieParser(app)

withExpressApp(app)({
  scanOpts: {
    cwd: resolveFromRoot('server/apis'),
    pattern: '**/*.js',
    ignore: ['**/_*.js', '**/_*/*.js']
  },
  apiPrefix: '/apis'
})

initIndexPageEntry(app)

initServerRunner(app)
  .then(message => {
    console.log(message)
  })
  .catch(err => {
    console.error(err.stack || err)
    process.exit(-1)
  })

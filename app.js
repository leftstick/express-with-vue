const express = require('express')

const setupExtensions = require('./server/core/extension')
const configExpress = require('./server/core/express')
const setupAPIRoutes = require('./server/api')
const setupIndexRoutes = require('./server/entry')

run().catch(err => {
  console.log(err)
  setTimeout(function() {
    process.exit(-1)
  }, 2000)
})

async function run() {
  const app = express()

  setupExtensions(app)
  configExpress(app)

  setupAPIRoutes(app)
  setupIndexRoutes(app)

  await app.launch()
}

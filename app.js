const express = require('express')

const setupExtensions = require('./server/core/extension')
const configExpress = require('./server/core/express')
const setupAPIRoutes = require('./server/api')
const setupIndexHTMLRoutes = require('./server/entry')

const clusterGo = require('./server/core/cluster')

clusterGo(() => {
  run().catch(err => {
    console.log(err)
    setTimeout(function() {
      process.exit(-1)
    }, 2000)
  })
})

async function run() {
  const app = express()

  setupExtensions(app)
  configExpress(app)

  setupAPIRoutes(app)
  setupIndexHTMLRoutes(app)

  await app.launch()
}

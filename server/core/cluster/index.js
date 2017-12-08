const cluster = require('cluster')
const numWorkers = require('os').cpus().length

module.exports = function(appSetup) {
  if (cluster.isMaster) {
    console.log('Master cluster setting up ' + numWorkers + ' workers...')

    for (let i = 0; i < numWorkers; i++) {
      cluster.fork()
    }

    cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online')
    })

    cluster.on('exit', function(worker, code, signal) {
      console.warn('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
      console.warn('Starting a new worker')
      cluster.fork()
    })
    return
  }
  appSetup()
}

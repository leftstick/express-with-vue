const path = require('path')
const glob = require('glob')

const Injection = require('../core/di')
const InvalidParamsError = require('../core/error/InvalidParamsError')
const { API_VERBS } = require('../core/util/constant')
const { isString, isNull } = require('../core/util/Object')
const Context = require('../core/performance/context')

const EXPECTED_ERRORS = ['DuplicatedError', 'InvalidParamsError', 'NotExistError']

const injection = new Injection().loadClasses()

function getAPIModules() {
  const files = glob.sync('**/*.js', {
    cwd: path.resolve(__dirname),
    ignore: ['index.js', '**/_*.js']
  })

  return files.map(file => ({
    file,
    route: require(`./${file}`)
  }))
}

const skipApiWithoutApiField = mod => {
  if (mod.route.api) {
    return true
  }
  console.info(`[WARN - api] miss api field in [${mod.file}]`)
  return false
}

const skipApiWithIncorrectCollectionField = mod => {
  if (isNull(mod.route.collection)) {
    return true
  }
  if (!isNull(mod.route.collection) && (isString(mod.route.collection) || Array.isArray(mod.route.collection))) {
    return true
  }
  console.info(`[WARN - api] miss collection field in [${mod.file}]`)
  return false
}

const logErrors = err => {
  if (EXPECTED_ERRORS.indexOf(err.name) > -1) {
    return
  }
  console.error(err)
}

const wapperRouteHandler = (handler, verb, mod) => {
  const { route } = mod
  const entryKey = `${verb}-${mod.route.api}`
  injection.registerDependencies(entryKey, handler)

  return function(req, res, next) {
    res.ctx = new Context(req && req.query && req.query.perfLogger)
    const services = injection.findControllerDIs(entryKey, res.ctx)

    handler(req, res, ...services).catch(function(err) {
      if (err instanceof InvalidParamsError) {
        return res.sendError(400, err)
      }
      if (!err.message) {
        err.message = ''
      }
      err.message = `[ERROR - api] [${route.api}] = ${err.message}`
      logErrors(err)
      res.sendServerError(err)
    })
  }
}

const registerRoute = app => {
  return mod => {
    const router = app.route(mod.route.api)
    Object.keys(mod.route)
      .filter(verb => API_VERBS.indexOf(verb) > -1)
      .forEach(verb => {
        router[verb](wapperRouteHandler(mod.route[verb], verb, mod))
      })
  }
}

module.exports = function(app) {
  getAPIModules()
    .filter(skipApiWithoutApiField)
    .filter(skipApiWithIncorrectCollectionField)
    .forEach(registerRoute(app))
}

const { readFileSync } = require('fs')
const express = require('express')
const { reap } = require('safe-reaper')
const Parser = require('parse-comments')
const { scanAPIs } = require('../assistant/utils/scanner')
const router = express.Router()

const parser = new Parser()

const cachedRoute = {}

const PREFIX = '/apis'

module.exports.registerAPIs = function(app) {
  const apis = scanAPIs()

  const apiModules = apis.map(api => ({
    filePath: api,
    module: require(api),
    code: readFileSync(api, { encoding: 'utf-8' })
  }))

  const routeInfos = apiModules.reduce((prev, apiModule) => {
    return prev.concat(parseRouteInfo(apiModule))
  }, [])

  register(app, routeInfos)
}

/**
 *
 * @param {{filePath: string, module: object, code: string}} apiModule
 */
function parseRouteInfo(apiModule) {
  const ast = parser.parse(apiModule.code)
  const apiMethods = Object.keys(apiModule.module)

  apisExposedShouldHaveDeclaration(apiMethods, ast)

  const routeInfos = getRouteInfo(apiMethods, ast, apiModule.module)

  for (let i = 0; i < routeInfos.length; i++) {
    const routeInfo = routeInfos[i]

    if (!routeInfo.api.startsWith('/')) {
      throw new Error(`API ${routeInfo.httpMethod}_${routeInfo.api} is declared with incorrect @api`)
    }
    if (routeInfo.api[1] === '/') {
      throw new Error(`API ${routeInfo.httpMethod}_${routeInfo.api} is declared with incorrect @api`)
    }

    if (cachedRoute[`${routeInfo.httpMethod}_${routeInfo.api}`]) {
      throw new Error(
        `You defined API [${routeInfo.httpMethod} ${routeInfo.api}] more than once, please verify your code first`
      )
    }
    cachedRoute[`${routeInfo.httpMethod}_${routeInfo.api}`] = true
  }
  return routeInfos
}

function apisExposedShouldHaveDeclaration(apiMethods, ast) {
  for (let i = 0; i < apiMethods.length; i++) {
    const apiMethod = apiMethods[i]
    if (ast.every(a => reap(a, 'code.context.name') !== apiMethod)) {
      throw new Error(`You missed declaration for API [${apiMethod}]`)
    }
  }
}

/**
 *
 * @param {Array<string>} apiMethods
 * @param {any} ast
 * @param {Object} module
 *
 * @returns {Array<{apiHandler: Function, httpMethod: string, api: string}>}
 */
function getRouteInfo(apiMethods, ast, module) {
  return apiMethods.map(apiMethod => {
    const tags = ast.find(a => reap(a, 'code.context.name') === apiMethod).tags
    return {
      apiHandler: module[apiMethod],
      httpMethod: (tags.find(tag => tag.title.toLowerCase() === 'method') || {}).name || '',
      api: (tags.find(tag => tag.title.toLowerCase() === 'api') || {}).name || ''
    }
  })
}

/**
 *
 * @param {Array<{apiHandler: Function, httpMethod: string, api: string}>} routeInfos
 */
function register(app, routeInfos) {
  routeInfos.forEach(routeInfo => {
    router[routeInfo.httpMethod](routeInfo.api, routeInfo.apiHandler)
  })

  app.use(PREFIX, router)
}

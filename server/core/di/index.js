const fs = require('fs')
const { resolve } = require('path')
const { skipUnderline } = require('../util/Method')
const InjectorError = require('../error/InjectorError')

const SERVICE_DIR = resolve(__dirname, '..', '..', 'service')

const FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m
const CONSTRUCT_ARGS = /constructor\s*\(\s*([^)]*)\)/m
const FN_ARG_SPLIT = /,/
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm

class Injection {
  constructor() {
    this.services = []
  }

  loadClasses() {
    const files = fs.readdirSync(SERVICE_DIR)
    const services = files
      .filter(skipUnderline)
      .filter(f => fs.statSync(resolve(SERVICE_DIR, f)).isFile())
      .map(f => require(resolve(SERVICE_DIR, f)))

    this.services.push(...services)

    return this
  }

  findControllerDI(func) {
    const entryServiceClasses = this.findControllerDIKeys(func)
    const serviceInstances = {}

    serviceClasses.forEach(serviceClass => {
      const serviceDIs = this.findServiceDIKeys(serviceClass)
    })
  }

  _getDIInstances(serviceClass, serviceInstances) {
    const serviceDIs = this.findServiceDIKeys(serviceClass)
  }

  findControllerDIKeys(func) {
    const keys = extractArgs(func)[1]
      .split(FN_ARG_SPLIT)
      .slice(2)
      .map(arg => arg.replace(/\s+/, ''))

    this.checkServiceExist(keys)

    return this.services.filter(s => keys.indexOf(s.name) > -1)
  }

  findServiceDIKeys(cls) {
    const keys = extractConstrucArgs(cls)[1]
      .split(FN_ARG_SPLIT)
      .map(arg => arg.replace(/\s+/, ''))

    this.checkServiceExist(keys)

    return this.services.filter(s => keys.indexOf(s.name) > -1)
  }

  checkServiceExist(classNames) {
    const nonExist = classNames.filter(key => this.services.every(s => s.name !== key))
    if (nonExist.length) {
      const msg = `You are trying to inject non-existing service [${nonExist[0]}] in handler`
      throw new InjectorError(msg)
    }
  }
}

function stringifyFn(fn) {
  // Support: Chrome 50-51 only
  // Creating a new string by adding `' '` at the end, to hack around some bug in Chrome v50/51
  // (See https://github.com/angular/angular.js/issues/14487.)
  return Function.prototype.toString.call(fn) + ' '
}

function extractArgs(fn) {
  const fnText = stringifyFn(fn).replace(STRIP_COMMENTS, '')
  const args = fnText.match(FN_ARGS)
  return args
}

function extractConstrucArgs(cls) {
  const fnText = stringifyFn(cls).replace(STRIP_COMMENTS, '')
  const args = fnText.match(CONSTRUCT_ARGS)
  return args
}

module.exports = Injection

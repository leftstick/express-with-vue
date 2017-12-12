const glob = require('glob')
const { resolve } = require('path')
const Dependency = require('./dependency')
const InjectorError = require('../error/InjectorError')

const SERVICE_DIR = resolve(__dirname, '..', '..', 'service')

const FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m
const CONSTRUCT_ARGS = /constructor\s*\(\s*([^)]*)\)/m
const FN_ARG_SPLIT = /,/
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm

class Injection {
  constructor() {
    this.loadedServiceClasses = []
    this.dependencies = {}
  }

  loadClasses() {
    const files = glob.sync('**/*.js', {
      cwd: SERVICE_DIR,
      ignore: ['**/_*.js']
    })
    const services = files.map(f => require(resolve(SERVICE_DIR, f)))

    this.loadedServiceClasses.push(...services)

    return this
  }

  registerDependencies(entryKey, func) {
    const entryServiceClassNames = this._findControllerDINames(func)
    this.dependencies[entryKey] = []
    for (let i = 0; i < entryServiceClassNames.length; i++) {
      const className = entryServiceClassNames[i]
      const clazz = this.loadedServiceClasses.find(c => c.name === className)

      this.dependencies[entryKey].push(this._registerDependency(clazz))
    }
  }

  _registerDependency(clazz) {
    const dependNames = this._findServiceDIKeys(clazz)
    const dependClasses = dependNames.map(name => {
      const found = this.loadedServiceClasses.find(c => c.name === name)
      if (!found) {
        throw new Error(`You are injecting non-exist service [${name}]`)
      }
      return found
    })

    this._checkCircularDependency(dependClasses, clazz.name, clazz.name, 1)

    return new Dependency(clazz, dependClasses.map(d => this._registerDependency(d)))
  }

  _checkCircularDependency(dependClasses, className, currentName, count) {
    if (count === 10) {
      throw new Error(`You have circular dependencies, please check your services`)
    }
    for (let i = 0; i < dependClasses.length; i++) {
      const clazz = dependClasses[i]
      if (clazz.name === className) {
        throw new Error(`You cannot have circular dependency between ${className} and ${currentName}`)
      }
      const dependNames = this._findServiceDIKeys(clazz)
      const nextDependClasses = dependNames.map(name => this.loadedServiceClasses.find(c => c.name === name))
      this._checkCircularDependency(nextDependClasses, className, clazz.name, count + 1)
    }
  }

  findControllerDIs(entryKey) {
    if (this.dependencies[entryKey]) {
      return this._resolveDependencyInstances(this.dependencies[entryKey])
    }
    throw new Error(`Unknow entryKey [${entryKey}]`)
  }

  _resolveDependencyInstances(dependencies) {
    return dependencies.map(depend => this._getDIInstance(depend, {}))
  }

  _getDIInstance(depend, instancesCache) {
    if (instancesCache[depend.clazz.name]) {
      return instancesCache[depend.clazz.name]
    }
    /* eslint-disable */
    const instance = new depend['clazz'](...depend.depends.map(d => this._getDIInstance(d, instancesCache)))
    /* eslint-enable */
    instancesCache[depend.clazz.name] = instance
    return instance
  }

  _findControllerDINames(func) {
    const keys = extractArgs(func)[1]
      .split(FN_ARG_SPLIT)
      .slice(2)
      .map(arg => arg.replace(/\s+/, ''))

    this._checkServiceExist(keys)

    return keys
  }

  _findServiceDIKeys(cls) {
    const extractArgs = extractConstrucArgs(cls)
    const keys = ((extractArgs && extractArgs[1]) || '')
      .split(FN_ARG_SPLIT)
      .map(arg => arg.replace(/\s+/, ''))
      .filter(arg => !!arg)

    return keys
  }

  _checkServiceExist(classNames) {
    const nonExist = classNames.filter(key => this.loadedServiceClasses.every(s => s.name !== key))
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

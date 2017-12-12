const util = require('util')
const memored = require('memored')
const { isDev } = require('../core/util/env')
const { id } = require('../core/util/String')

let todos = [
  {
    id: id(),
    text: 'Learn JavaScript',
    completed: true
  },
  {
    id: id(),
    text: 'Learn Angular.js',
    completed: true
  },
  {
    id: id(),
    text: 'Learn vue',
    completed: false
  },
  {
    id: id(),
    text: 'Learn React.js',
    completed: false
  }
]

let read, store

const storage = {
  todolist: todos
}

if (isDev) {
  read = async function(key) {
    return storage[key]
  }

  store = async function(key, value) {
    storage[key] = value
  }
} else {
  read = util.promisify(memored.read.bind(memored))
  store = util.promisify(memored.store.bind(memored))
  memored.store('todolist', todos, function() {
    console.log('Value stored!')
  })
}

class MemoryService {
  get(key) {
    return read(key)
  }

  save(key, value) {
    return store(key, value)
  }
}

module.exports = MemoryService

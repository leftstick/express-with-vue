const util = require('util')
const memored = require('memored')
const { id } = require('../core/util/String')

const read = util.promisify(memored.read.bind(memored))
const store = util.promisify(memored.store.bind(memored))

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

memored.store('todolist', todos, function() {
  console.log('Value stored!')
})

class MemoryService {
  get(key) {
    return read(key)
  }

  save(key, value) {
    return store(key, value)
  }
}

module.exports = MemoryService

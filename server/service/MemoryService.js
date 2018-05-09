const { id } = require('../assistant/utils/string')

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

const storage = {
  todolist: todos
}

const read = async function(key) {
  return storage[key]
}

const store = async function(key, value) {
  storage[key] = value
}

class MemoryService {
  async get(key) {
    const result = await read(key)
    return result
  }

  save(key, value) {
    return store(key, value)
  }
}

module.exports = new MemoryService()

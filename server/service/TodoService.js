const util = require('util')
const memored = require('memored')
const InvalidParamsError = require('../core/error/InvalidParamsError')
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

class TodoService {
  async getAllTodos() {
    const todos = await read('todolist')
    return todos
  }

  async getTodoById(id) {
    const todos = await read('todolist')
    return todos.find(t => t.id === id)
  }

  async saveTodo(opts) {
    const todos = await read('todolist')
    const todo = {
      id: id(),
      text: opts.text,
      completed: opts.completed
    }
    todos.unshift(todo)
    await store('todolist', todos)
    return todo
  }

  async updateTodo(id, opts) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await read('todolist')
    const found = todos.find(t => t.id === id)

    if (!found) {
      throw new InvalidParamsError(`Specific [${id}] non-exist`)
    }

    const newtodo = Object.assign({}, found, opts)

    const newtodos = todos.map(t => {
      if (t.id === id) {
        return newtodo
      }
      return t
    })

    await store('todolist', newtodos)
    return newtodo
  }

  async deleteTodo(id) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await read('todolist')
    const found = todos.find(t => t.id === id)

    const newtodos = todos.filter(t => t.id !== id)

    await store('todolist', newtodos)

    return found
  }

  async updateTodosStatus(opts) {
    const todos = await read('todolist')
    const newtodos = todos.map(todo => {
      todo.completed = opts.completed
      return todo
    })
    await store('todolist', newtodos)
    return true
  }

  async deleteTodos(opts) {
    const todos = await read('todolist')
    const newtodos = todos.filter(todo => todo.completed === !opts.completed)
    await store('todolist', newtodos)
    return todos
  }
}

module.exports = TodoService

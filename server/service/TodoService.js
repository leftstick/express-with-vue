const InvalidParamsError = require('../core/error/InvalidParamsError')
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

class TodoService {
  async getAllTodos() {
    return todos
  }

  async getTodoById(id) {
    return todos.find(t => t.id === id)
  }

  async saveTodo(opts) {
    const todo = {
      id: id(),
      text: opts.text,
      completed: opts.completed
    }
    todos.push(todo)
    return todo
  }

  async updateTodo(id, opts) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }

    const found = todos.find(t => t.id === id)

    if (!found) {
      throw new InvalidParamsError(`Specific [${id}] non-exist`)
    }

    Object.keys(opts).forEach(k => {
      found[k] = opts[k]
    })

    return found
  }

  async deleteTodo(id) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }

    const found = todos.find(t => t.id === id)

    todos = todos.filter(t => t.id !== id)

    return found
  }

  async updateTodosStatus(opts) {
    todos.forEach(todo => {
      todo.completed = opts.completed
    })
    return true
  }

  async deleteTodos(opts) {
    todos = todos.filter(todo => todo.completed === !opts.completed)
    return todos
  }
}

module.exports = TodoService

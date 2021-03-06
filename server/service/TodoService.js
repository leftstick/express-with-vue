const MemoryService = require('./MemoryService')
const InvalidParamsError = require('../errors/InvalidParamsError')
const { id } = require('../assistant/utils/string')

class TodoService {
  async getAllTodos() {
    const todos = await MemoryService.get('todolist')
    return todos
  }

  async getTodoById(id) {
    const todos = await MemoryService.get('todolist')
    return todos.find(t => t.id === id)
  }

  async saveTodo(opts) {
    const todos = await MemoryService.get('todolist')
    const todo = {
      id: id(),
      text: opts.text,
      completed: opts.completed
    }
    todos.unshift(todo)
    await MemoryService.save('todolist', todos)
    return todo
  }

  async updateTodo(id, opts) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await MemoryService.get('todolist')
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

    await MemoryService.save('todolist', newtodos)

    return newtodo
  }

  async deleteTodo(id) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await MemoryService.get('todolist')
    const found = todos.find(t => t.id === id)

    const newtodos = todos.filter(t => t.id !== id)

    await MemoryService.save('todolist', newtodos)

    return found
  }

  async updateTodosStatus(opts) {
    const todos = await MemoryService.get('todolist')
    const newtodos = todos.map(todo => {
      todo.completed = opts.completed
      return todo
    })
    await MemoryService.save('todolist', newtodos)
    return true
  }

  async deleteTodos(opts) {
    const todos = await MemoryService.get('todolist')
    const newtodos = todos.filter(todo => todo.completed === !opts.completed)
    await MemoryService.save('todolist', newtodos)
    return newtodos
  }
}

module.exports = new TodoService()

const InvalidParamsError = require('../core/error/InvalidParamsError')
const { id } = require('../core/util/String')

class TodoService {
  constructor(MemoryService) {
    this.MemoryService = MemoryService
  }
  async getAllTodos() {
    const todos = await this.MemoryService.get('todolist')
    return todos
  }

  async getTodoById(id) {
    const todos = await this.MemoryService.get('todolist')
    return todos.find(t => t.id === id)
  }

  async saveTodo(opts) {
    const todos = await this.MemoryService.get('todolist')
    const todo = {
      id: id(),
      text: opts.text,
      completed: opts.completed
    }
    todos.unshift(todo)
    await this.MemoryService.save('todolist', todos)
    return todo
  }

  async updateTodo(id, opts) {
    this.ctx.logStart('updateTodo+gettodolist')
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await this.MemoryService.get('todolist')
    this.ctx.logEnd('updateTodo+gettodolist')
    const found = todos.find(t => t.id === id)

    if (!found) {
      throw new InvalidParamsError(`Specific [${id}] non-exist`)
    }

    this.ctx.logStart('updateTodo+modify')
    const newtodo = Object.assign({}, found, opts)

    const newtodos = todos.map(t => {
      if (t.id === id) {
        return newtodo
      }
      return t
    })

    await this.MemoryService.save('todolist', newtodos)

    this.ctx.logEnd('updateTodo+modify')
    return newtodo
  }

  async deleteTodo(id) {
    if (!id) {
      throw new InvalidParamsError('[id] is missing in path')
    }
    const todos = await this.MemoryService.get('todolist')
    const found = todos.find(t => t.id === id)

    const newtodos = todos.filter(t => t.id !== id)

    await this.MemoryService.save('todolist', newtodos)

    return found
  }

  async updateTodosStatus(opts) {
    const todos = await this.MemoryService.get('todolist')
    const newtodos = todos.map(todo => {
      todo.completed = opts.completed
      return todo
    })
    await this.MemoryService.save('todolist', newtodos)
    return true
  }

  async deleteTodos(opts) {
    const todos = await this.MemoryService.get('todolist')
    const newtodos = todos.filter(todo => todo.completed === !opts.completed)
    await this.MemoryService.save('todolist', newtodos)
    return newtodos
  }
}

module.exports = TodoService

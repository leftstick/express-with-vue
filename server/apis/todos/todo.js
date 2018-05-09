const service = require('../../service/TodoService')

module.exports.api = '/todo/:id?'

module.exports.get = async function(req, res) {
  const result = await service.getTodoById(req.params.id)

  return result
}

module.exports.post = async function(req, res) {
  const result = await service.saveTodo(req.body)

  return result
}

module.exports.put = async function(req, res) {
  const result = await service.updateTodo(req.params.id, req.body)

  return result
}

module.exports.delete = async function(req, res) {
  const result = await service.deleteTodo(req.params.id)

  return result
}

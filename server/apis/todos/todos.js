const service = require('../../service/TodoService')

module.exports.api = '/todos'

module.exports.get = async function(req, res) {
  const result = await service.getAllTodos()

  return result
}

module.exports.put = async function(req, res) {
  const result = await service.updateTodosStatus(req.body)

  return result
}

module.exports.delete = async function(req, res) {
  const result = await service.deleteTodos(req.body)

  return result
}

module.exports.api = '/api/todos'

module.exports.get = async function(req, res, TodoService) {
  const result = await TodoService.getAllTodos()

  res.sendApi(result)
}

module.exports.put = async function(req, res, TodoService) {
  const result = await TodoService.updateTodosStatus(req.body)

  res.sendApi(result)
}

module.exports.delete = async function(req, res, TodoService) {
  const result = await TodoService.deleteTodos(req.body)

  res.sendApi(result)
}

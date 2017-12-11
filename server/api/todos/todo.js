module.exports.api = '/api/todo/:id?'

module.exports.get = async function(req, res, TodoService) {
  const result = await TodoService.getTodoById(req.params.id)

  res.sendApi(result)
}

module.exports.post = async function(req, res, TodoService) {
  const result = await TodoService.saveTodo(req.body)

  res.sendApi(result)
}

module.exports.put = async function(req, res, TodoService) {
  const result = await TodoService.updateTodo(req.params.id, req.body)

  res.sendApi(result)
}

module.exports.delete = async function(req, res, TodoService) {
  const result = await TodoService.deleteTodo(req.params.id)

  res.sendApi(result)
}

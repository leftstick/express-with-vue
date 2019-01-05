const service = require('../service/TodoService')
const { resolveResult } = require('../assistant/utils/http')

/**
 * @method get
 * @api /todo/:id
 **/
module.exports.getTodoById = async function(req, res) {
  const result = await service.getTodoById(req.params.id)

  return res.json(resolveResult(result))
}

/**
 * @method post
 * @api /todo
 **/
module.exports.createTodo = async function(req, res) {
  const result = await service.saveTodo(req.body)

  return res.json(resolveResult(result))
}

/**
 * @method put
 * @api /todo/:id
 **/
module.exports.updateTodo = async function(req, res) {
  const result = await service.updateTodo(req.params.id, req.body)

  return res.json(resolveResult(result))
}

/**
 * @method delete
 * @api /todo/:id
 **/
module.exports.removeTodo = async function(req, res) {
  const result = await service.deleteTodo(req.params.id)

  return res.json(resolveResult(result))
}

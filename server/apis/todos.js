const service = require('../service/TodoService')
const { resolveResult } = require('../assistant/utils/http')

/**
 * @method get
 * @api /todos
 **/
module.exports.getAllTodos = async function(req, res) {
  const result = await service.getAllTodos()

  return res.json(resolveResult(result))
}

/**
 * @method put
 * @api /todos
 **/
module.exports.updateMultipleTodoStatus = async function(req, res) {
  const result = await service.updateTodosStatus(req.body)

  return res.json(resolveResult(result))
}

/**
 * @method delete
 * @api /todos
 **/
module.exports.removeMultipleTodos = async function(req, res) {
  const result = await service.deleteTodos(req.body)

  return res.json(resolveResult(result))
}

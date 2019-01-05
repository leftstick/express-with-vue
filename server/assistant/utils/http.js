module.exports.API_VERBS = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']

module.exports.resolveResult = function(data, err) {
  return {
    code: err ? err.code : 200,
    message: err ? err.message : '',
    data
  }
}

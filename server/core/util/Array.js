module.exports.pick = function(arr, keys) {
  if (!arr) {
    return []
  }
  const data = arr.map(d => {
    if (!keys || !keys.length) {
      return d
    }
    // eslint-disable-next-line
    return keys.reduce((p, c) => ((p[c] = d[c]), p), {})
  })
  return data
}

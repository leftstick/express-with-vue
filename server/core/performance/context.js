class Context {
  constructor(enabled) {
    this.enabled = enabled
    this.startPoints = {}
    this.result = []
  }

  isEnabled() {
    return this.enabled
  }

  logStart(seriesID) {
    if (!this.enabled) {
      return
    }
    if (!this.startPoints[seriesID]) {
      this.startPoints[seriesID] = new Date()
    }
    if (this.result.every(r => r.key !== seriesID)) {
      this.result.push({
        key: seriesID,
        value: 'pending'
      })
    }
  }

  logEnd(seriesID) {
    if (!this.enabled) {
      return
    }
    if (!this.startPoints[seriesID]) {
      return console.warn(`[${seriesID}] never starts`)
    }
    this.result.find(r => r.key === seriesID).value = new Date() - this.startPoints[seriesID] + 'ms'
  }

  resolve() {
    if (!this.enabled) {
      return
    }
    return this.result.map(r => `${r.key} : ${r.value}`)
  }
}

module.exports = Context

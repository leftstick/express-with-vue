export function ieVersion() {
  return document.documentMode || /Edge/.test(navigator.userAgent)
}

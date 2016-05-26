require('custom-event-polyfill')

Element.prototype.qs = function (sel) {
  return this.querySelector(sel)
}

Element.prototype.qsa = function (sel) {
  return Array.prototype.slice.call(this.querySelectorAll(sel))
}

Element.prototype.on = Element.prototype.addEventListener

Element.prototype.off = Element.prototype.removeEventListener

Element.prototype.once = function (name, cb) {
  this.on(name, once)
  function once (evt) {
    this.off(name, once)
    cb(evt)
  }
}

Element.prototype.emit = function (name, params) {
  params = { detail: params }
  var event = new CustomEvent(name, params)
  this.dispatchEvent(event)
  event = new CustomEvent('*', params)
  this.dispatchEvent(event)
}

Element.prototype.bind = function () {
  for (var i = 0; i < arguments.length; i++) {
    var method = arguments[i]
    this[method] = this[method].bind(this)
  }
}

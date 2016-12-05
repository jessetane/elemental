require('custom-event-polyfill')

Element.prototype.qs = function (sel) {
  return this.querySelector(sel)
}

Element.prototype.qsa = function (sel) {
  return Array.prototype.slice.call(this.querySelectorAll(sel))
}

Element.prototype.on = Element.prototype.addEventListener

Element.prototype.off = function (name, cb) {
  var args = Array.prototype.slice.call(arguments)
  if (cb._once) {
    args[1] = cb._once
    delete cb._once
  }
  return Element.prototype.removeEventListener.apply(this, args)
}

Element.prototype.once = function (name, cb) {
  var self = this
  var args = Array.prototype.slice.call(arguments)
  args[1] = cb._once = once
  return this.on.apply(this, args)
  function once (evt) {
    Element.prototype.removeEventListener.apply(self, args)
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

Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}

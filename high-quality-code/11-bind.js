/**
 * 手写 bind 函数
 * fn.call(this, a, b, c)
 * fn.apply(this, [])
 * const newFn = fn.bind(this, [])
 */

Function.prototype.acBind = function (obj, ...args) {
  const fn = (...arg) => {
    this.call(obj, ...arg, ...args)
  }

  return fn
}

function fn(a, b) {
  console.log(this.message, a + b)
}

const obj = {
  message: 'Hello'
}

const newFn = fn.acBind(obj, 1)

newFn(2)

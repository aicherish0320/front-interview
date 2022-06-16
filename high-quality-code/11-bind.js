/**
 * 手写 bind 函数
 * fn.call(this, a, b, c)
 * fn.apply(this, [])
 * const newFn = fn.bind(this, [])
 */

Function.prototype.acBind = function (obj, ...args) {
  const fn = () => {
    this.call(obj, ...args)
  }

  return fn
}

function fn(a, b) {
  console.log(this.message, a + b)
}

const obj = {
  message: 'Hello'
}

const newFn = fn.acBind(obj, 1, 2)

newFn()

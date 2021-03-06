/**
 * 手写 call apply
 *
 * 分析：如何在函数执行时绑定 this
 * const obj = { x: 100, fn(){ this.x } }
 * 执行 obj.fn()，此时 fn 内部的 this 就指向 obj
 * 可借此来实现函数绑定 this
 */

Function.prototype.acCall = function (context, ...args) {
  // null undefined
  if (!context) context = globalThis
  // 非对象
  if (typeof context !== 'object') context = new Object(context)

  const fnKey = Symbol()
  context[fnKey] = this

  const ret = context[fnKey](...args)

  delete context[fnKey] // 清理调 fn，防止污染

  return ret
}
Function.prototype.acApply = function () {}

function fn(a, b) {
  console.log(this.foo, a + b)
}
const obj = {
  foo: 'foo'
}

fn.acCall(obj, 1, 2)

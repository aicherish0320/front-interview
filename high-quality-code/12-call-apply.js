/**
 * 手写 call apply
 */

Function.prototype.acCall = function () {
  const fn = this
}
Function.prototype.acApply = function () {}

const fn = (a, b) => {
  console.log(this.foo, a + b)
}
const obj = {
  foo: 'foo'
}

fn.call(obj, 1, 2)

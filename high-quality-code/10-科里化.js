/**
 * 函数科里化
 */

const curry = (fn) => {
  function newFn(...args) {
    if (fn.length === args.length) {
      return fn.apply(this, args)
    } else {
      return (...arg) => {
        return newFn(...arg, ...args)
      }
    }
  }
  return newFn
}

const add = (a, b, c) => {
  return a + b + c
}

const newAdd = curry(add)

console.log(newAdd(1)(2, 3))
console.log(newAdd(1)(2)(3))
console.log(newAdd(1, 2, 3))

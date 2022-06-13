const _ = require('lodash')

const curry = (fn) =>
  (newFn = (...args) =>
    fn.length === args.length
      ? fn(...args)
      : (...arg) => newFn(...args, ...arg))

// function curry(fn) {
//   // 获取参数的个数 fn.length
//   const newFn = (...args) => {
//     if (args.length === fn.length) {
//       return fn(...args)
//     } else {
//       return (...arg) => newFn(...arg, ...args)
//     }
//   }

//   return newFn()
// }

// const curry = (fn) =>
//   (judge = (...args) =>
//     args.length >= fn.length ? fn(...args) : (...arg) => judge(...args, ...arg))

const fn = curry(function (a, b, c) {
  return a + b + c
})

console.log(fn(1, 2)(4))

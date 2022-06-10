/**
 1. Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 2. Promise 中有三种状态，分别为 成功fulfilled、失败rejected、等待pending
    pending -> fulfilled pending -> rejected
    一旦状态确定就不可更改
 3. resolve reject 函数是用来更改状态的
    resolve: fulfilled
    reject: rejected
  4. then 方法内部做的事情就是判断状态，成功，调用成功的回调函数，失败，则调用失败的回调函数
  5. then 成功回调有一个参数，表示成功之后的值，then 失败回调有一个参数，表示失败的原因
  6. promise 链式调用，then 方法的链式调用 不能返回自身的 promise
 */

const AcPromise = require('./AcPromise')

const promise1 = new AcPromise((resolve, reject) => {
  // resolve(100)
  reject('error')
})

const promise2 = new AcPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(200)
  }, 2000)
})

AcPromise.resolve(100).then((value) => {
  console.log(value)
})

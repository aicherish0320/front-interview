/*
  1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
  2. Promise 有三种状态 分别为 pending fulfilled rejected
  3. resolve 和 reject 函数是用来更改状态的
  resolve -> fulfilled
  reject -> rejected
  4. then 方法内部做的事情就判断状态 如果状态成功 调用成功的回调函数 
    如果失败 调用失败的回调函数
  5. then 成功回调有一个参数 表示成功之后的值 then 失败回调有一个参数 表示失败的原因
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class AcPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = PENDING
  value = undefined
  reason = undefined
  successCallback = []
  failCallback = []
  resolve = (value) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = REJECTED
    this.reason = reason
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  then(successCallback, failCallback) {
    let promise2 = new AcPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = successCallback(this.value)
          resolvePromise(promise2, x, resolve, reject)
        }, 0)
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  if (x instanceof AcPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

const promise = new AcPromise((resolve, reject) => {
  resolve('success')
})

const p1 = promise.then((value) => {
  console.log(value)
  return p1
})
p1.then(
  () => {},
  (reason) => {
    console.log(reason.message)
  }
)

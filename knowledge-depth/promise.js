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
  resolve = (value) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = FULFILLED
    this.value = value
  }
  reject = (reason) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = REJECTED
    this.reason = reason
  }
  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}

const promise = new AcPromise((resolve, reject) => {
  resolve('success')
  // reject('failure')
})
promise.then(
  (value) => {
    console.log(value)
  },
  (reason) => {
    console.log(reason)
  }
)

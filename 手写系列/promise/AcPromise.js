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
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value

    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason

    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  then(successCallback, failCallback) {
    const promise2 = new AcPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          const x = successCallback(this.value)
          // 判断 x 的值是普通值还是 promise 对象
          // 如果是普通值 直接调用 resolve
          // 如果是 promise 对象，查看 promise 对象返回的结果
          // 再根据 promise 对象返回的结果，决定调用 resolve，还是调用 reject
          // resolve(x)
          resolvePromise(promise2, x, resolve, reject)
        })
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
  if (x === promise2) {
    return reject(new TypeError('出现 promise 循环调用'))
  }
  if (x instanceof AcPromise) {
    x.then(
      (value) => {
        resolve(value)
      },
      (reason) => {
        reject(reason)
      }
    )
  } else {
    resolve(x)
  }
}

module.exports = AcPromise

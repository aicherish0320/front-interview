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
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    } else {
      this.successCallback.push(successCallback)
      this.failCallback.push(failCallback)
    }
  }
}

module.exports = AcPromise

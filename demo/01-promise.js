const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

let id = 0
class APromise {
  constructor(executor) {
    this.id = id++
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
      this.successCallback.shift()()
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) return

    this.status = REJECTED
    this.reason = reason

    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }
  then(successCallback, failCallback) {
    const promise2 = new APromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = successCallback(this.value)
        resolve(x)
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        this.successCallback.push(() => {
          const x = successCallback(this.value)
          resolve(x)
        })
        this.failCallback.push(failCallback)
      }
    })
    return promise2
  }
  static all(array) {
    return new APromise((resolve, reject) => {
      let result = []
      let index = 0
      function addData(key, value) {
        index++
        result[key] = value
        if (index === array.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < array.length; i++) {
        const p = array[i]

        if (p instanceof APromise) {
          p.then(
            (value) => addData(i, value),
            (reason) => {
              reject(reason)
            }
          )
        } else {
          addData(i, p)
        }
      }
    })
  }
}

const promise1 = new APromise((resolve, reject) => {
  resolve('success1')
})
const promise2 = new APromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success2')
  }, 1000)
})

APromise.all([12, promise1, promise2, 'hello']).then((result) => {
  console.log(result)
})

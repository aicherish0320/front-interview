const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class AcPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
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
    successCallback = successCallback ? successCallback : (value) => value
    failCallback = failCallback
      ? failCallback
      : (reason) => {
          throw reason
        }

    const promise2 = new AcPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = successCallback(this.value)
            // 判断 x 的值是普通值还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象，查看 promise 对象返回的结果
            // 再根据 promise 对象返回的结果，决定调用 resolve，还是调用 reject
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              const x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              const x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
  finally(callback) {
    return this.then(
      (value) => {
        return AcPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return AcPromise.resolve(callback()).then(() => reason)
      }
    )
  }
  static all(array) {
    return new AcPromise((resolve, reject) => {
      let result = []
      let index = 0
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        const current = array[i]
        if (current instanceof AcPromise) {
          current.then(
            (value) => {
              addData(i, value)
            },
            (reason) => reject(reason)
          )
        } else {
          addData(i, current)
        }
      }
    })
  }
  static resolve(value) {
    if (value instanceof AcPromise) {
      return value
    }
    return new AcPromise((resolve) => resolve(value))
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

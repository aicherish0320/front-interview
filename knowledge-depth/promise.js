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
    if (this.status !== PENDING) {
      return
    }
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) {
      this.successCallback.shift()()
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) {
      return
    }
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

    let promise2 = new AcPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
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
        return AcPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }
  static all(arr) {
    let result = []
    let index = 0

    return new AcPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        console.log('index >>> ', index)

        if (index === arr.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < arr.length; i++) {
        let current = arr[i]
        if (current instanceof AcPromise) {
          current.then(
            (value) => {
              addData(i, value)
            },
            (reason) => {
              reject(reason)
            }
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
    } else {
      return new AcPromise((resolve) => {
        resolve(value)
      })
    }
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
// ! Test
const promise = new AcPromise((resolve, reject) => {
  resolve('resolve')
})
const p2 = new AcPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 1000)
})

promise
  .finally(() => {
    console.log('finally')
    return p2
  })
  .then(
    (value) => {
      console.log('value >>> ', value)
    },
    (reason) => {
      console.log('reason >>> ', reason)
    }
  )

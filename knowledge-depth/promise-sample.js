// Promise 基本示例

const promise = new Promise((resolve, reject) => {
  // 这里用于兑现的承诺，可能成功，也可能失败
  resolve(100) // 承诺达成
  // reject(new Error('promise rejected')) // 承诺失败
})

promise
  .then((value) => {
    console.log(value)
    return new Promise((resolve, reject) => {
      resolve('new Promise')
    })
  })
  .then((res) => {
    console.log(res)
  })

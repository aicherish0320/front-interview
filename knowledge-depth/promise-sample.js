// Promise 基本示例

const promise = new Promise((resolve, reject) => {
  // 这里用于兑现的承诺，可能成功，也可能失败
  resolve(100) // 承诺达成
  // reject(new Error('promise rejected')) // 承诺失败
})

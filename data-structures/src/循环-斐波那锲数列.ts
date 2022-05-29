/**
 * 求斐波那锲数列第 n 个值
 * 1 1 2 3 5 8 13 21 34 55
 * fn = fn(n - 1) + fn(n - 2)
 */

// 不用递归 用循环
// 记录中间结果
// 时间复杂度 O(n)
const fibonacci = (i: number): number => {
  if (i <= 1 || i === 2) {
    return 1
  }
  let n1 = 1
  let n2 = 1
  let ret = 0

  for (let j = 2; j < i; j++) {
    ret = n1 + n2
    n2 = n1
    n1 = ret
  }

  return ret
}

console.log('fibonacci(3) >>> ', fibonacci(3))
console.log('fibonacci(4) >>> ', fibonacci(4))
console.log('fibonacci(10) >>> ', fibonacci(10))

export {}

/**
 * 求斐波那锲数列第 n 个值
 * 1 1 2 3 5 8 13 21 34 55
 * fn = fn(n - 1) + fn(n - 2)
 */

// 递归 - 大量的重复计算
// 时间复杂度：O(2^n)
const fibonacci = (i: number): number => {
  if (i <= 1 || i === 2) {
    return 1
  }
  return fibonacci(i - 1) + fibonacci(i - 2)
}

console.log('fibonacci(10) >>> ', fibonacci(10))

export {}

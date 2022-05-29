/**
 * 动态规划
 *  - 把一个大问题，拆解为多个小问题，逐级向下拆解
 *  - 用递归的思路去分析问题，再改为循环来实现
 *  - 算法三大思维：贪心、二分、动态规划
 */

/**
 * 青蛙跳台阶
 * 一只青蛙，一次可跳一级，也可跳二级
 * 问：青蛙跳到 n 级台阶，总共有多少种方式？
 *
 * 1  2      3             4
 * 1  1/12   111/12/21   1111/112/121/22/211
 *
 * f(n) = f(n - 1) + f(n - 2)
 */

const fn = (n: number): number => {
  if (n === 1) return 1
  if (n === 2) return 2

  let n1 = 2
  let n2 = 1
  let res = 0

  for (let i = 2; i < n; i++) {
    res = n1 + n2
    n2 = n1
    n1 = res
  }

  return res
}

console.log('fn(2) >>> ', fn(2))
console.log('fn(3) >>> ', fn(3))
console.log('fn(4) >>> ', fn(4))
console.log('fn(4) >>> ', fn(100))

export {}

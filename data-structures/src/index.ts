/**
 给一个数组，找出其中和为 n 的两个元素
  有一个递增的数组 [1, 2, 4, 7, 11, 15] 和一个 n = 15
  数组中有两个数，和是 n，即 4 + 11 === 15
  写一个 JS 函数，找出这两个数
思路：
  嵌套循环，找到一个数，然后去遍历下一个数，求和，判断
  时间复杂度是 O(n ^ 2)，不可用
 */

const arr = [1, 2, 4, 7, 11, 15]
const n = 15
// ! 双循环
const twoSum = (arr: number[], n: number) => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === n) {
        console.log(' >>> ', arr[i], arr[j])
      }
    }
  }
}

twoSum(arr, n)

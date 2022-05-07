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
// const twoSum = (arr: number[], n: number) => {
//   const len = arr.length
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] + arr[j] === n) {
//         console.log(' >>> ', arr[i], arr[j])
//       }
//     }
//   }
// }

// ! 利用递增（有序）的特性，双指针法
/*
  步骤：
    随便找两个数
    如果和大于 n，则需要向前寻找
    如果和小于 n，则需要向后寻找 - 二分法
  定义 i 指向头，j 指向尾，求 arr[i] + arr[j]
  如果大于 n，则j需要向前移动
  如果小于 n，则i需要向后移动
*/

// const twoSum = (arr: number[], n: number) => {
//   let start = 0
//   let end = arr.length - 1
//   while (start <= end) {
//     const sum = arr[start] + arr[end]
//     if (sum > n) {
//       end--
//     } else if (sum < n) {
//       start++
//     } else {
//       console.log(arr[start], arr[end])
//       return
//     }
//   }
// }

// ! 使用 map
const twoSum = (arr: number[], n: number) => {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const other = n - arr[i]
    if (map.has(other)) {
      console.log(other, arr[i])
      return
    } else {
      map.set(arr[i], i)
    }
  }
}

twoSum(arr, n)

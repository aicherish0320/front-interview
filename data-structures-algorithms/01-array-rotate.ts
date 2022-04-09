/*
  将一个数组旋转 k 步
  输入一个数组 [1, 2, 3, 4, 5, 6, 7]
  k = 3，即旋转3步
  输出 [5, 6, 7, 1, 2, 3, 4]
*/
// ! 思路1：把末尾的元素挨个 pop，然后 unshift 到数组前面
// 时间复杂度：O(n^2)  空间复杂度：O(1)
export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)

  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n) {
      // 数组是一个有序结构， unshift 操作非常慢 (shift splice unshift)
      // 数组占用连续的内存空间
      // O(n)
      arr.unshift(n)
    }
  }
  return arr
}
// ! 思路2：把数组拆分，最后 concat 拼接到一起
// 时间复杂度：O(1)  空间复杂度：O(n)
export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)
  // slice 不会改变原数组
  // O(1)
  const part1 = arr.slice(-step)
  const part2 = arr.slice(0, length - step)
  const part3 = part1.concat(part2)

  return part3
}

//! 性能测试
// const arr1 = []
// for (let i = 0; i < 10 * 10000; i++) {
//   arr1.push(i)
// }
// console.time('arr1')
// rotate1(arr1, 9 * 10000) // 1.867s
// console.timeEnd('arr1')

// const arr2 = []
// for (let i = 0; i < 10 * 10000; i++) {
//   arr2.push(i)
// }
// console.time('arr2')
// rotate2(arr2, 9 * 10000) // 0.918ms
// console.timeEnd('arr2')

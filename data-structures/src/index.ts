/*
  给一个数组，找出其中和为 n 的两个元素
*/
const arr = [0, 1, 3, 2, 7, 2, 5, 4]

// ! 解法一：暴力循环
// const twoSum = (arr: number[], target: number) => {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === target) {
//         console.log(arr[i], arr[j])
//       }
//     }
//   }
// }
// !解法二：使用 map
const twoSum = (arr: number[], target: number) => {
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    const other = target - arr[i]
    if (map.has(other)) {
      console.log(other, arr[i])
    } else {
      map.set(arr[i], i)
    }
  }
}

twoSum(arr, 4)

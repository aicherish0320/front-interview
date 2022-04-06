/*
  将一个数组旋转 k 步
  输入一个数组 [1, 2, 3, 4, 5, 6, 7]
  k = 3，即旋转3步
  输出 [5, 6, 7, 1, 2, 3, 4]
*/
// ! 思路1：把末尾的元素挨个 pop，然后 unshift 到数组前面
// ! 思路2：把数组拆分，最后 concat 拼接到一起

export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)

  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n) {
      arr.unshift(n)
    }
  }
  return arr
}

export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) return arr
  const step = Math.abs(k % length)

  const part1 = arr.slice(-step)
  const part2 = arr.slice(0, length - step)
  const part3 = part1.concat(part2)

  return part3
}

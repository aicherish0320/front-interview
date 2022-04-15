/**
 * 用 js 实现二分查找
 * @param source 有序数组
 * @param num 需要查找的数
 * @returns 返回结果
 */
const binarySearch = (source: number[], num: number) => {
  const len = source.length
  if (len === 0) return -1

  let low = 0
  let high = len - 1
  let mid

  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    if (source[mid] === num) {
      return mid
    } else if (num < source[mid]) {
      high = mid - 1
    } else if (num > source[mid]) {
      low = mid + 1
    }
  }
  return -1
}

const source: number[] = [1, 2, 3, 4, 5]
console.log(binarySearch(source, 3))
console.log(binarySearch(source, 1))
console.log(binarySearch(source, 5))
console.log(binarySearch(source, 6))

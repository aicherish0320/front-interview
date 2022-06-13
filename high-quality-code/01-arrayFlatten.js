/**
  写一个 JS 函数，实现数组扁平化，只减少一级嵌套
  [1, [2, [3]], 4] -> [1, 2, [3], 4]
  思路
    1. 定义空数组 arr = []。遍历当前数组
    2. 如果 item 非数组，则累加到 arr
    3. 如果 item 是数组，则遍历之后累加到 arr
 */
// ! 解法1
const flatten1 = (arr) => {
  const ret = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((ii) => {
        ret.push(ii)
      })
    } else {
      ret.push(item)
    }
  })

  return ret
}
// ! 解法2
const flatten2 = (arr) => {
  let ret = []
  arr.forEach((item) => {
    ret = ret.concat(item)
  })
  return ret
}

const arr = [1, [2, [3]], 4]

console.log(flatten2(arr))

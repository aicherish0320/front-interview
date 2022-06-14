/**
  写一个 JS 函数，实现数组扁平化，深度嵌套
  思路
    1. 定义空数组 arr = []。遍历当前数组
    2. 如果 item 非数组，则累加到 arr
    3. 如果 item 是数组，则遍历之后累加到 arr
 */

const flatten1 = (arr) => {
  let ret = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flatten1(item)
      flatItem.forEach((n) => ret.push(n))
    } else {
      ret.push(item)
    }
  })

  return ret
}

const flatten2 = (arr) => {
  let ret = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      ret = ret.concat(flatten1(item))
    } else {
      ret.push(item)
    }
  })

  return ret
}

const arr = [1, [2, 3]]

console.log(flatten1(arr))

/**
 * 字符串中连续最多的字符，以及次数
 *
 * 传统思路
 *  嵌套循环，找出每个字符的连接次数，并记录
 *  看似时间复杂度是 O(n^2)
 *  但实际时间复杂度是多少？ - O(n)，因为有跳步
 */

const fn = (str: string) => {
  let ret = {
    char: '',
    length: 0
  }
  const length = str.length

  let tempLength = 0

  for (let i = 0; i < length; i++) {
    tempLength = 0
    for (let j = i; j < length; j++) {
      if (str[i] === str[j]) {
        tempLength++

        if (j === length - 1) {
          if (tempLength > ret.length) {
            ret.length = tempLength
            ret.char = str[i]
          }
        }

        continue
      }
      // 不相等
      if (str[i] !== str[j] || j === length - 1) {
        if (tempLength > ret.length) {
          ret.length = tempLength
          ret.char = str[i]
        }
        if (i < length - 1) {
          i = j - 1
        }
        break
      }
    }
  }

  return ret
}

const str = 'abbcccddeeee11223'
console.log('fn(str) >>> ', fn(str))

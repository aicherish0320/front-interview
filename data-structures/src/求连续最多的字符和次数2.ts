/**
 * 字符串中连续最多的字符，以及次数
 *
 * 双指针
 */

const fn = (str: string) => {
  const length = str.length
  let i, j
  let ret = {
    char: '',
    length: 0
  }
  let tempLength = 0
  for (i = 0, j = 0; i < length; i++) {
    if (str[i] === str[j]) {
      tempLength++
    }
    if (str[i] !== str[j] || i === length - 1) {
      if (tempLength > ret.length) {
        ret.length = tempLength
        ret.char = str[j]
      }
      tempLength = 0

      if (i < length - 1) {
        j = i
        // 矫正i
        i--
      }
    }
  }
  return ret
}

const str = 'abbcccddeeee11223'
console.log('fn(str) >>> ', fn(str))

export {}

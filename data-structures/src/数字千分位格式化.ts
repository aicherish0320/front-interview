/**
 * 数字千分位格式化，输出字符串
 *
 * 常见思路
 *  - 转换为数组，reverse，每3为拆分
 *  - 使用正则表达式
 *  - 使用字符串拆分
 *
 * 1234567 -> 1,234,567
 */

const fn1 = (n: number): string => {
  const s = n.toString()
  const arr = s.split('').reverse()
  return arr.reduce((prev, value, index) => {
    if (index % 3 === 0) {
      if (prev) {
        return value + ',' + prev
      } else {
        return value
      }
    } else {
      return value + prev
    }
  }, '')
}

const fn2 = (n: number): string => {
  const s = n.toString()
  const length = s.length
  let ret = ''

  for (let i = length - 1; i >= 0; i--) {
    const j = length - i
    if (j % 3 === 0) {
      if (i === 0) {
        ret = s[i] + ret
      } else {
        ret = ',' + s[i] + ret
      }
    } else {
      ret = s[i] + ret
    }
  }

  return ret
}

console.log(fn2(1234567))

export {}

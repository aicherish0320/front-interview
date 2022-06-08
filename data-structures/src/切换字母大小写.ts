/**
 * 切换字母大小写
 */

const fn1 = (str: string): string => {
  let ret = ''
  let reg1 = /[a-z]/
  let reg2 = /[A-Z]/
  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    if (reg1.test(c)) {
      ret += c.toUpperCase()
    } else if (reg2.test(c)) {
      ret += c.toLowerCase()
    } else {
      ret += c
    }
  }

  return ret
}

const fn2 = (str: string): string => {
  let ret = ''

  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    const code = c.charCodeAt(0)
    if (code >= 65 && code <= 90) {
      ret += c.toLowerCase()
    } else if (code >= 97 && code <= 122) {
      ret += c.toUpperCase()
    } else {
      ret += c
    }
  }

  return ret
}

console.time('fn1')
console.log(fn1('1zBd3'))
console.timeEnd('fn1')

console.time('fn2')
console.log(fn2('1zBd3'))
console.timeEnd('fn2')

export {}

/**
 * 求 1-10000 之间的所有对称数
 *
 * 1221 1010 232
 *
 *  思路1：
 *    使用数组反转、比较
 *  思路2：
 *     字符串头尾比较
 *  思路3：
 *    生成翻转数
 *    使用 % 和 Math.floor 生成翻转数
 */

const fn1 = (max: number): number[] => {
  const ret: number[] = []
  for (let i = 0; i < max; i++) {
    const str1 = parseInt(i.toString().split('').reverse().join(''))
    if (str1 === i) {
      ret.push(i)
    }
  }
  return ret
}

const fn2 = (max: number): number[] => {
  const ret: number[] = []

  for (let i = 0; i < max; i++) {
    const s = i.toString()
    let start = 0
    let end = s.length - 1
    let flag = true
    while (start < end) {
      if (s[start] === s[end]) {
        start++
        end--
      } else {
        flag = false
        break
      }
    }
    if (flag) {
      ret.push(i)
    }
  }

  return ret
}

const fn3 = (max: number): number[] => {
  const ret: number[] = []

  for (let i = 0; i < max; i++) {
    let n = i
    let rev = 0

    while (n > 0) {
      rev = rev * 10 + (n % 10)
      n = Math.floor(n / 10)
    }

    if (i === rev) {
      ret.push(i)
    }
  }

  return ret
}

console.time('fn1')
console.log(fn1(200000))
console.timeEnd('fn1') // 100.14794921875 ms

console.time('fn2')
console.log(fn2(200000))
console.timeEnd('fn2') // 24.56005859375 ms

console.time('fn3')
console.log(fn3(200000))
console.timeEnd('fn3') // 17.6708984375 ms

export {}

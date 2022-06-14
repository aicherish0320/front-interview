// 获取数据类型
const getType = (input) => {
  if (typeof input !== 'object') {
    return typeof input
  } else {
    const typeArr = Object.prototype.toString.call(input)
    return typeArr.match(/\[object (.*)\]/)[1].toLowerCase()
  }
}

console.log(getType(1))
console.log(getType('1'))
console.log(getType(true))
console.log(getType(null))
console.log(getType(undefined))
console.log(getType(Symbol()))
console.log(getType({ x: 1 }))
console.log(getType([1]))
console.log(getType(function () {}))
console.log(getType(new Map()))
console.log(getType(new Set()))

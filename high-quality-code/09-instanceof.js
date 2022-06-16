/**
 * 手写 instanceof
 *
 * a instanceof A
 * 表示在 a 的原型上找到 A
 * 顺着 a.__proto__ 向上查找 （原型链）
 * 看能否找到 A.prototype
 *
 * 值类型 instanceof 都是为 false
 */

class Person {
  constructor(name) {
    this.name = name
  }
}
class Dog {
  constructor(name) {
    this.name = name
  }
}

const p1 = new Person('jack')
const d1 = new Dog('yellow')

const acInstanceof = (inst, ctor) => {
  if (typeof inst !== 'object' && typeof inst !== 'function') return false

  while (ctor.prototype && inst) {
    if (ctor.prototype === inst.__proto__) {
      return true
    }
    inst = inst.__proto__
  }

  return false
}

console.log(acInstanceof(p1, Person))
console.log(acInstanceof(1, Person))
console.log(acInstanceof(null, Person))
console.log(acInstanceof([1, 2, 3], Person))
console.log(acInstanceof([1, 2, 3], Array))

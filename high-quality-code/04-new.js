// new 一个对象发生了什么？手写实现？

/*
  new 一个对象的过程
  - 创建一个空对象，继承构造函数的原型
  - 指向构造函数（将 obj 作为 this）
  - 返回 obj
*/

const Person = (fullName) => {
  this.fullName = fullName
}

const person = new Person('aicherish')

const acNew = (ctor, ...args) => {
  // 创建一个实例 返回
  const obj = Object.create(ctor.prototype)
  // this 指向当前构造函数
  ctor.apply(this, args)

  return obj
}

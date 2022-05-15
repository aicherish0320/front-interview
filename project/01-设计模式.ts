/**
 * 工厂模式
 */
// class Person {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// function createPerson(name: string) {
//   return new Person(name)
// }
// const p1 = createPerson('aicherish')
// const p2 = createPerson('aic')

/**
 * 单例模式
 */
class SingleTon {
  private static instance: SingleTon | null = null
  private constructor() {}
  public static getInstance(): SingleTon {
    this.instance = this.instance || new SingleTon()
    return this.instance
  }
  message: string = 'Hello SingleTon'
}

const s1 = SingleTon.getInstance()
const s2 = SingleTon.getInstance()
console.log('s1.message >>> ', s1.message)
console.log('s2.message >>> ', s2.message)
console.log('s1 === s2 >>> ', s1 === s2)

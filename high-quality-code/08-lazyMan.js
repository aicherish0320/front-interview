/**
 * 手写 LazyMan
 *
 * 1. 支持 sleep 和 eat 两个方法
 * 2. 支持链式调用
 *
 * 代码设计
 *
 * 1. 由于有 sleep 功能，函数不能直接在调用时触发
 * 2. 初始化一个列表，把函数注册进去
 * 3. 由每个 item 触发 next 执行（遇到 sleep 则异步触发）
 */

class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []

    setTimeout(() => {
      this.next()
    })
  }
  next() {
    const task = this.tasks.shift()
    if (task) task()
  }
  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleep(seconds) {
    const task = () => {
      console.log(`${this.name} 开始睡觉`)
      setTimeout(() => {
        console.log(`${this.name} 已经睡完了 ${seconds}s`)
        this.next()
      }, seconds * 1000)
    }
    this.tasks.push(task)

    return this
  }
}

const man = new LazyMan('jack')

man.eat('苹果').eat('香蕉').sleep(2).eat('葡萄')

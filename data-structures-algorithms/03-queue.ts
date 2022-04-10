/*
  两个栈实现一个队列
*/
export class Queue {
  private stack1: number[] = []
  private stack2: number[] = []
  add(n: number) {
    this.stack1.push(n)
  }
  delete(): number | null {
    const stack1 = this.stack1
    const stack2 = this.stack2
    // 1. stack2 入栈
    while (stack1.length) {
      stack2.push(stack1.pop())
    }
    // 2. stack2 出栈
    const ret = stack2.pop() || null
    // 3. 更新 stack1
    while (stack2.length) {
      stack1.push(stack2.pop())
    }

    return ret
  }
  get length() {
    return this.stack1.length
  }
}

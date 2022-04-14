/**
 * @description 用链表实现队列
 */

interface INode {
  value: string
  next: INode | null
}

export class MyQueue {
  private head: INode | null
  private tail: INode | null
  private len: number
  constructor() {
    this.head = null
    this.tail = null
    this.len = 0
  }
  add(val: string) {
    const newNode: INode = {
      value: val,
      next: null
    }
    if (!this.head) {
      this.head = newNode
    }

    const tailNode = this.tail
    if (tailNode) {
      this.tail.next = newNode
    }
    this.tail = newNode

    this.len++
  }
  delete(): string | null {
    const headNode = this.head
    if (!headNode) {
      return null
    }
    if (this.len <= 0) {
      return null
    }

    const value = headNode.value

    this.head = headNode.next

    this.len--

    return value
  }
  get length(): number {
    return this.len
  }
}

// const q = new MyQueue()
// q.add('a')
// q.add('b')
// q.add('c')
// console.log('q >>> ', q)
// console.log('q.delete >>> ', q.delete())
// console.log('q1 >>> ', q)
// console.log(q.length)

// console.log('q.delete2 >>> ', q.delete())
// console.log('q.delete3 >>> ', q.delete())
// console.log('q.delete4 >>> ', q.delete())

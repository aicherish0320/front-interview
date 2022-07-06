class Queue {
  private items: number[] = []

  enqueue(element: number) {
    this.items.push(element)
  }
  dequeue(): number {
    return this.items.shift()!
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())

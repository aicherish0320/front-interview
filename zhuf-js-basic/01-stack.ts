class Stack {
  private items: number[] = []

  push(element: number) {
    this.items.push(element)
  }

  pop(): number {
    return this.items.pop()!
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.pop()) // 3
console.log(stack.pop()) // 2
console.log(stack.pop()) // 1

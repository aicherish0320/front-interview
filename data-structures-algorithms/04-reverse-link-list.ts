/*
  定义一个 JS 函数，反转单向链表

  链表：
*/

function ListNode(val) {
  this.val = val
  this.next = null
}

export default function reverseLinkList(head) {
  let prev = null
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

const head = new ListNode('a')
const node1 = new ListNode('b')
const node2 = new ListNode('c')

head.next = node1
node1.next = node2

console.log(head)
console.log(reverseLinkList(head))

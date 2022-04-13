/**
 * @description 反转一个单向链表
 */

interface ILinkListNode {
  value: string
  next?: ILinkListNode | null
}

const reverseLL = (head: ILinkListNode): ILinkListNode => {
  let prevNode: ILinkListNode | null = null
  let curNode: ILinkListNode = head
  let nextNode: ILinkListNode | null = null
  while (curNode) {
    nextNode = curNode.next
    curNode.next = prevNode
    // 移动指针
    prevNode = curNode
    curNode = nextNode
  }
  return prevNode
}

/**
 * 生成单向链表
 * @param arr 链表 value 数组
 * @returns 链表头
 */
const createLinkList = (arr: string[]): ILinkListNode => {
  const length = arr.length

  if (!length) {
    throw new Error('array is empty')
  }
  let curNode: ILinkListNode = {
    value: arr[length - 1]
  }
  if (length === 1) {
    return curNode
  }

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode
    }
  }
  return curNode
}

console.log(createLinkList(['a', 'b', 'c']))

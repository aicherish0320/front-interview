import {
  ILinkListNode,
  reverseLL,
  createLinkList
} from './05-reverse-link-list'

describe('反转单向链表', () => {
  it('单个元素', () => {
    const node: ILinkListNode = { value: 'a' }
    const node1 = reverseLL(node)

    expect(node1).toEqual({ value: 'a', next: null })
  })
  it('多个元素', () => {
    const node = createLinkList(['a', 'b', 'c'])
    const node1 = reverseLL(node)
    expect(node1).toEqual({
      value: 'c',
      next: {
        value: 'b',
        next: {
          value: 'a',
          next: null
        }
      }
    })
  })
})

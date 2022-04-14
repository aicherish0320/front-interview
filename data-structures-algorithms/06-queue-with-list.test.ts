import { MyQueue } from './06-queue-with-list'
/**
 * @description 用链表实现队列 test
 */

describe('链表实现队列测试', () => {
  const q = new MyQueue()
  it('入队', () => {
    expect(q.length).toBe(0)
    q.add('a')
    expect(q.length).toBe(1)
    q.add('b')
    expect(q.length).toBe(2)
  })
  it('出队', () => {
    const value = q.delete()
    expect(value).toBe('a')
    expect(q.length).toBe(1)
  })
})

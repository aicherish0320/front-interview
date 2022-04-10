import { Queue } from './03-queue'
describe('两个栈实现一个队列', () => {
  const q = new Queue()

  it('入队', () => {
    q.add(1)
    q.add(2)
    expect(q.length).toEqual(2)
  })
  it('出队', () => {
    const ret = q.delete()
    expect(ret).toBe(1)
    expect(q.length).toEqual(1)
  })
})

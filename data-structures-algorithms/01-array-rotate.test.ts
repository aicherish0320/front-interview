import { rotate1, rotate2 } from './01-array-rotate'

describe('将一个数组旋转K步', () => {
  it('正常情况-rotate1', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    const ret = rotate1(arr, k)

    expect(ret).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('正常情况-rotate2', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    const ret = rotate2(arr, k)

    expect(ret).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('数组为空', () => {
    const res = rotate1([], 3)

    expect(res).toEqual([])
  })

  it('K 是0', () => {
    const res = rotate1([], 3)

    expect(res).toEqual([])
  })

  it('k 是负值', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = -3
    const ret = rotate1(arr, k)

    expect(ret).toEqual([5, 6, 7, 1, 2, 3, 4])
  })
})

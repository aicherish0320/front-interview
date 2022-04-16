import { binarySearch } from './07-binary-search'

describe('二分查找', () => {
  const source = [1, 2, 3, 4, 5, 6]
  it('find 3 in source', () => {
    const result = binarySearch(source, 3)
    expect(result).toBe(2)
  })
  it('find 5 in source', () => {
    const result = binarySearch(source, 5)
    expect(result).toBe(4)
  })
  it('find 100 in source', () => {
    const result = binarySearch(source, 100)
    expect(result).toBe(-1)
  })
})

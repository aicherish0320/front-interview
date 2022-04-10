import { matchBracket } from './02-match-bracket'

describe('判断字符串括号是否匹配', () => {
  it('正常', () => {
    const ret = matchBracket('([{}])')
    expect(ret).toBe(true)
  })
  it('错误', () => {
    const ret = matchBracket('([}])')
    expect(ret).toBe(false)
  })
  it('非偶数', () => {
    const ret = matchBracket('(()')
    expect(ret).toBe(false)
  })
  it('顺序不一况', () => {
    const ret = matchBracket('([{(})])')
    expect(ret).toBe(false)
  })
})

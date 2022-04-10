export const matchBracket = (str: string): boolean => {
  if (str.length % 2 !== 0 && str.length) return false

  const left = ['(', '[', '{']
  const right = [')', ']', '}']
  const stack = []

  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    if (left.indexOf(char) > -1) {
      stack.push(char)
    } else if (right.indexOf(char) > -1) {
      const last = stack[stack.length - 1]
      if (
        (last === '(' && char === ')') ||
        (last === '[' && char === ']') ||
        (last === '{' && char === '}')
      ) {
        stack.pop()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
}

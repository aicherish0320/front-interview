/**
 * 将数组中的 0 移动到末尾
 *
 * - 如输入 [1, 0, 3, 0, 11, 0]，输出[1, 3, 11, 0, 0, 0]
 * - 只移动0，其他顺序不变
 * - 必须在原数组进行操作
 */

const fn = (numbers: number[]) => {
  const len = numbers.length
  let zeroLength = 0
  for (let i = 0; i < len - zeroLength; i++) {
    const number = numbers[i]
    if (number === 0) {
      numbers.push(number)
      numbers.splice(i, 1)
      i--
      zeroLength++
    }
  }
}

const numbers = [1, 0, 3, 0, 11, 0]

fn(numbers)

console.log('numbers >>> ', numbers)

export {}

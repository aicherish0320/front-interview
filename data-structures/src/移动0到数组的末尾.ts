/**
 * 将数组中的 0 移动到末尾
 *
 * - 如输入 [1, 0, 3, 0, 11, 0]，输出[1, 3, 11, 0, 0, 0]
 * - 只移动0，其他顺序不变
 * - 必须在原数组进行操作
 */

// 解法一
// const fn = (numbers: number[]) => {
//   const len = numbers.length
//   let zeroLength = 0
//   for (let i = 0; i < len - zeroLength; i++) {
//     const number = numbers[i]
//     if (number === 0) {
//       numbers.push(number)
//       numbers.splice(i, 1)
//       i--
//       zeroLength++
//     }
//   }
// }

// 解法二
/**
 * 双指针
 *  - 定义 j 指向第一个0，i 指向 j 后面的第一个非 0
 *  - 交换 i 和 j 的值，继续向后移动
 *  - 只遍历一次，所以时间复杂度是 O(n)
 */
const fn = (numbers: number[]) => {
  const len = numbers.length
  let i,
    j = -1 // 指向第一个 0
  for (i = 0; i < len; i++) {
    if (numbers[i] === 0) {
      if (j < 0) {
        j = i
      }
    }
    if (numbers[i] !== 0 && j >= 0) {
      const n = numbers[i]
      numbers[i] = numbers[j]
      numbers[j] = n

      j++
    }
  }
}

const numbers = [1, 0, 0, 4, 11, 0]

fn(numbers)

console.log('numbers >>> ', numbers)

export {}

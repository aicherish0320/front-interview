/**
 * 快速排序
 */

// const quickSort = (arr: number[]): number[] => {
//   const length = arr.length
//   if (length === 0) return arr

//   const midIndex = Math.floor(length / 2)
//   const midValue = arr.splice(midIndex, 1)[0]

//   const left: number[] = []
//   const right: number[] = []

//   for (let i = 0; i < arr.length; i++) {
//     const n = arr[i]
//     if (n < midValue) {
//       left.push(n)
//     } else {
//       right.push(n)
//     }
//   }

//   return quickSort(left).concat([midValue], quickSort(right))
// }

// const arr = [3, 2, 1]

const quickSort = (arr: number[]): number[] => {
  const length = arr.length
  if (length === 0) return arr

  const midIndex = Math.floor(length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0]

  const left: number[] = []
  const right: number[] = []

  for (let i = 0; i < length; i++) {
    if (i !== midIndex) {
      const n = arr[i]
      if (n < midValue) {
        left.push(n)
      } else {
        right.push(n)
      }
    }
  }

  return quickSort(left).concat([midValue], quickSort(right))
}

const arr = [3, 2, 1]

console.log('quickSort >>> ', quickSort(arr))

export {}

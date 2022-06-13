const arr = [
  { id: 5, name: '部门5', pid: 4 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 4, name: '部门4', pid: 3 }
]

/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] }
      result.push(newItem)
      getChildren(data, newItem.children, item.id)
    }
  }
}

/**
 * 转换方法
 */
const arrayToTree1 = (data, pid) => {
  const result = []
  getChildren(data, result, pid)
  return result
}

const arrayToTree2 = (arr) => {
  const result = [] // 存放结果集
  const itemMap = {} //

  // 先转成map存储
  for (const item of arr) {
    itemMap[item.id] = { ...item, children: [] }
  }

  for (const item of arr) {
    const id = item.id
    const pid = item.pid
    const treeItem = itemMap[id]
    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

const arrayToTree3 = (arr) => {
  const result = [] // 存放结果集
  const itemMap = {} //
  for (const item of arr) {
    const id = item.id
    const pid = item.pid
    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id]

    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

console.time('arrayToTree1')
arrayToTree1(arr, 0)
console.timeEnd('arrayToTree1')

console.time('arrayToTree2')
arrayToTree2(arr, 0)
console.timeEnd('arrayToTree2')

console.time('arrayToTree3')
arrayToTree3(arr, 0)
console.timeEnd('arrayToTree3')

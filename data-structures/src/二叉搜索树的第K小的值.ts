/**
 * # 求一个二叉搜索树的第 K 个小值
 * ## 二叉树
 *  - 是一棵树
 *  - 每个节点，最多只能有 2 个子节点
 *  - 树节点的数据结构 { value: '', left?: '', right?: '' }
 * ## 二叉搜索树 BST
 *  - left value <= root value
 *  - right value >= root value
 *  - 可使用二分法进行快速查找
 * ## 解题思路
 *  - BST 中序遍历，即从小到大的排序
 *  - 找到排序后的第 K 值即可
 */

interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}

const tree: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    }
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 8,
      left: null,
      right: null
    }
  }
}

/**
 * 中序遍历
 * @param node tree
 */

const getKthNumber: (tree: ITreeNode, k: number) => number | null = (
  tree,
  k
) => {
  const arr: number[] = []
  const inOrderTraverse = (node: ITreeNode) => {
    if (!node) return
    node.left && inOrderTraverse(node.left)
    arr.push(node.value)
    node.right && inOrderTraverse(node.right)
  }
  inOrderTraverse(tree)

  return arr[k - 1]
}

console.log(getKthNumber(tree, 2))

export {}

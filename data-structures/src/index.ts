/**
 * # 求一个二叉搜索树的第 K 个小值
 * ## 二叉树
 *  - 是一棵树
 *  - 每个节点，最多只能有 2 个子节点
 *  - 树节点的数据结构 { value: '', left?: '', right?: '' }
 * ## 二叉树的遍历
 *  - 前序遍历
 *  - 中序遍历
 *  - 后序遍历
 */

interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}

const tree: ITreeNode = {
  value: 1,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 5,
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
      value: 4,
      left: null,
      right: null
    }
  }
}
/**
 * 先序遍历
 * @param node tree
 */
const preOrderTraverse = (node: ITreeNode) => {
  if (!node) return
  console.log(node.value)
  node.left && preOrderTraverse(node.left)
  node.right && preOrderTraverse(node.right)
}

// preOrderTraverse(tree)

/**
 * 中序遍历
 * @param node tree
 */
const inOrderTraverse = (node: ITreeNode) => {
  if (!node) return
  node.left && inOrderTraverse(node.left)
  console.log(node.value)
  node.right && inOrderTraverse(node.right)
}

// inOrderTraverse(tree)

const postOrderTraverse = (node: ITreeNode) => {
  if (!node) return
  node.left && postOrderTraverse(node.left)
  node.right && postOrderTraverse(node.right)
  console.log(node.value)
}

postOrderTraverse(tree)

export {}

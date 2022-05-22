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

const preOrderTraverse = (node: ITreeNode) => {}

export {}

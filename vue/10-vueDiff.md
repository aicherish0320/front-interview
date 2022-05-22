# 你了解 diff 算法吗？

# 思路

- diff 算法是干什么的
- 它的必要性
- 它何时执行
- 具体的执行方式
- 说一下 vue3 中的优化

# 回答范例

- Vue 中的 diff 算法成为 patching 算法，它由 Snabbledon 修改而来，虚拟 DOM 想要转化为真实 DOM 就需要通过 patch 方法转换
- 最初 Vue1.x 视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟 DOM 和 patching 算法支持，但是这样粒度过细导致 Vue1.x 无法承载较大应用;Vue2.x 中为了降低 Watcher 粒度，每个组件只有一个 Watcher 与之对应，此时就需要引入 patching 算法才能精确找到发生变化的地方并高效更新
- Vue 中 diff 执行的时刻是组件内响应数据变更触发实例执行其更新函数时，更新函数会再次执行 render 函数获得最新的虚拟 DOM，然后执行 patch 函数，并传入新旧两次虚拟 DOM，通过比对找到变化的地方，最后将其转化为对应的 DOM 操作。
- patch 过程是一个递归过程，遵循深度优先、同层比较的策略；以 Vue3 的 patch 为例：
  - 首先判断两个节点是否为相同同类节点，不同则删除重新创建
  - 如果双方都是文本则更新文本内容
  - 如果双方都是元素节点则递归更新子元素，同时更新元素属性
  - 更新子节点时又分了几种情况：
    - 新的子节点是文本，老的子节点是数组则清空，并设置文本
    - 新的子节点是文本，老的子节点是文本则直接更新文本
    - 新的子节点是数组，老的子节点是文本则清空文本，并创建新子节点数组中的子元素
    - 新的子节点是数组，老的子节点也是数组，那么比较两组子节点，更新细节
- Vue3 中引入的更新策略：编译期优化 patchFlags、block 等
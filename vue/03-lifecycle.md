# 简述 Vue 的生命周期以及每个阶段做的事

# 思路

1. 给你概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：Vue3 变化

# 回答范例

1. 每个 Vue 组件实例被创建后都会经历过一系列初始化步骤，比如，它需要数据观测、模板编译、挂载实例到 dom 上，以及数据变化时更新 dom。这个过程中会运行叫做生命周期钩子的函数，以便用户在特定阶段有机会添加他们自己的代码。
2. Vue 生命周期总共可以分为 8 个阶段：创建前后、载入前后、更新前后、销毁前后，以及一些特殊场景的生命周期。Vue3 中新增了三个用于调试和服务端渲染场景。
3. destroyed -> unmounted errorCaptured 错误捕获
4. Vue3 新增：

- renderTracked 响应式依赖被收集时调用
- renderTriggered 响应式依赖被触发时调用
- serverPrefetch 组件实例在服务器上被渲染前调用

# 结合实践

- beforeCreate：通常用于插件开发中执行一些初始化任务
- created：组件初始化完毕，可以访问各种数据，获取接口数据等
- mounted：dom 已创建，可用于获取访问数据和 dom 元素；访问子组件等
- beforeUpdate：此时'view'层还未更新，可用于获取更新前后各种状态
- updated：完成'view'层的更新，更新后，所有状态已是最新的
- beforeUnmounted：实例被销毁前调用，可用于一些定时器或订阅的取消
- unmounted：销毁一个实例，可清理它与其它实例的连接，解绑它的全部指令及事件监听器

## 追问：

1. setup 和 created 谁先执行？
2. setup 中为什么没有 beforeCreate 和 created？

# 你在实际工作中，做过哪些 Vue 优化？

- v-if 和 v-show
- v-for 使用 key
- 使用 computed 缓存
- keep-alive 缓存组件
  - 频繁切换的组件，如 tabs
  - 缓存太多会占用内存
- 异步组件
  - 针对体积较大的组件，如编辑器、复杂表格、复杂表单
  - 拆包，需要时异步加载，不需要时不加载
  - 减少主包的体积，首页会加载更快
- 路由懒加载
  - 项目比较大，拆分路由，保证首页先加载
- 服务端渲染
  - 可使用 Nuxt.js

# 你使用 Vue 遇到过哪些坑？（日常要注意记录总结，遇到坑就记录下）

- 内存泄漏、事件忘了解绑定
  - 全局变量、全局事件、全局定时器、自定义事件
- Vue2 响应式的缺陷（Vue3 不再有）
  - data 新增属性用 `Vue.set`
  - data 删除属性用 `Vue.delete`
  - 无法直接修改数据 `arr[index] = value`
- 路由切换时 scroll 到顶部
  - SPA 的通病，不仅仅是 Vue
  - 如，列表页、滚顶到第二屏，点击进入详情页
  - 再返回到列表页（此时组件重新渲染）就 scroll 到顶部
  - 解决：在列表页缓存数据和 scrollTop 值
    - 当再次返回列表时，渲染组件，执行 scrollTop(xx)
    - 终极方案：MPA + App WebView

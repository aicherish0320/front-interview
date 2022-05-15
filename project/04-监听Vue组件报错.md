# 如何统一监听 Vue 组件报错？

- window.onerror
  - 全局监听所有 JS 报错
  - 但它是 JS 级别的，识别不了 Vue 组件信息
  - 捕捉一些 Vue 监听不到的错误
- errorCapture 生命周期
  - 监听所有下级组件的错误
  - 返回 false 会阻止向上传播
- errorHandler 监听全局 Vue 组件的错误
- 异步错误需要使用 window.onerror

# 实际工作经验

- 考察重点
  - 性能优化，错误监控
  - 设计模式的应用
  - 项目难点，角色之间的沟通
- 注意事项
  - 仅做过个人项目，不代表有项目经验
- 题目
  - 如果一个网页访问慢，你该如何分析问题原因？
  - Vue 应该如何监听 JS 报错？
  - 你遇到了哪些项目难点？如何解决的
- H5 页面如何进行“首屏”优化？
  - 路由懒加载（适用于 SPA ，不适用 MPA），路由拆分，优先保证首页加载
  - 服务端渲染 SSR
    - 传统的前后端分离（SPA）渲染页面的过程复杂
    - SSR 渲染页面过程简单，所有性能好
    - 如果是纯 H5 页面，SSR 是性能优化的终极解决方案
  - App 预取
    - 如果 H5 在 App WebView 中展示，可使用 App 预取
    - 用户访问列表页时，App 预加载文章首屏内容
    - 用户进入 H5 页，直接从 App 中获取内容，瞬间展示首屏
  - 分页
    - 针对列表页
    - 默认只展示第一页内容
    - 上划加载更多
  - 图片懒加载 lazyLoad
    - 针对详情页
    - 默认只展示文本内容，然后触发图片懒加载
    - 注意：提前设置图片尺寸，尽量只重绘不重排
  - Hybrid
    - 提前将 HTML JS CSS 下载到 App 内部
    - 在 App webview 中使用 file:// 协议加载页面文件
    - 再用 Ajax 获取内容并展示

> 性能优化要配合分析、统计、评分等， 做了事情要有结果，性能优化也要需要配合体验，如骨架片、loading 动画等，不同的形式，有不同的优化方式

- 后端一次性返回 10W 条数据，你该如何渲染？
  - 后端返回 10W 条数据，本身技术方案设计就不合理
  - 主要和面试官沟通此事
  - 浏览器能否处理 10W 条数据
    - JS 没问题
    - 渲染到 DOM 会非常卡顿
  - 自定义中间层
    - 自定义 NodeJS 中间层，获取并拆分这 10w 条数据
    - 前端对接 NodeJS 中间层，而不是服务端
    - 成本比较高
  - 虚拟列表
    - 只渲染可视区 DOM
    - 其他隐藏区域不显示，只有 <div> 撑起高度
    - 随着浏览器滚动，创建和销毁 DOM
  - 虚拟列表-第三方 Lib
    - 虚拟列表实现起来非常复杂，可借用第三方 Lib
    - Vue-virtual-scroll-list
  - 重点
    - 要主动沟通，表达观点
    - 后端的问题，首先要用后端的思维去解决 - 中间层
    - 虚拟列表只是无奈的选择，实现复杂而且效果不一定好

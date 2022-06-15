# 描述从输入 URL 到页面展示的完整过程

- 网络请求

  - DNS 查询（得到 IP），建立 TCP 连接（三次握手）
  - 浏览器发起 HTTP 请求
  - 收到请求响应，得到 HTML 源代码

    - 继续请求静态资源
    - 解析 HTML 过程中，遇到静态资源还会继续发起网络请求
    - JS CSS 图片 视频等

    ** 注意：静态资源可能有强缓存，则不需要请求**

- 解析
  字符串 -> 结构化数据
  - HTML 构建 DOM 树
  - CSS 构建 CSSOM 树 （style tree）
  - 两者结合，形成 render tree
  - 优化解析
    - CSS 放在 head 中，不要异步加载 CSS
    - JS 放在 body 下面，或合理使用 async defer
    - img 提前定义 width height
- 渲染
  - Render Tree 绘制到页面
    - 计算各个 DOM 的尺寸、定位，最后绘制到页面
    - 遇到 JS 可能会执行
    - 异步 CSS 、图片加载，可能会触发重新渲染

https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work

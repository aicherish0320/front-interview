# `<Script>` defer 和 async 有什么区别？

- 无： HTML 暂停解析，下载 JS，执行 JS，再继续解析 HTML
- defer：HTML 继续解析，并行下载 JS，HTML 解析完再执行 JS
- async：HTML 继续解析，并行下载 JS，执行 JS，再解析 HTML

# prefetch 和 dns-prefetch 有什么区别？

- prefetch preload
  - preload：资源在当前页面使用，会优先加载
  - prefetch：资源再未来页面使用，空闲时加载
- dns-prefetch preconnect
  - dns-prefetch：DNS 预查询
  - preconnect：DNS 预连接

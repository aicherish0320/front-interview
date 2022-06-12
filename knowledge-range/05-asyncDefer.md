# `<Script>` defer 和 async 有什么区别？

- 无： HTML 暂停解析，下载 JS，执行 JS，再继续解析 HTML
- defer：HTML 继续解析，并行下载 JS，HTML 解析完再执行 JS
- async：HTML 继续解析，并行下载 JS，执行 JS，再解析 HTML

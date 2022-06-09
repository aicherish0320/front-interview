# 网络请求中，token 和 cookie 有什么区别？

## cookie

- HTTP 无状态，每次请求都要带 cookie，以帮助识别身份
- 服务端也可以向客户端 set-cookie、cookie 大小限制 4kb
- 默认有跨域限制：不可跨域共享、传递 cookie
- cookie 本地存储
  - HTML5 之前 cookie 常被用于本地存储
  - HTML5 之后 使用 localStorage sessionStorage
- 现代浏览器开始禁止第三方 cookie
  - 和跨域限制不同。这里是：禁止网页引入的第三方 JS 设置 cookie
  - 打击第三方广告，保护用户隐私
  - 新增属性 SameSite: Strict/Lax/Node，值可自己选择

## cookie 和 session

- cookie 用于登录验证，存储用户标识
- session 在服务端，存储用户详细信息，和 cookie 信息一一对应
- cookie + session 是常见登录验证解决方案

**withCredentials**，前后端都设置

## token VS cookie

- cookie 是 HTTP 规范，而 token 是自定义传递
- cookie 会默认被浏览器存储，而 token 需自己存储
- token 默认没有跨域限制

### JWT JSON Web Token

- 前端发起登录，后端验证成功之后，返回一个加密的 token
- 前端自行存储这个 token（其中包含了用户信息，加密了）
- 以后访问服务器接口，都带着这个 token，作为用户信息

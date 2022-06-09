# 如何实现 SSO 单点登录

## 基于 cookie

- cookie 默认不可跨域共享，但有些情况下可设置为共享
- 主域名相同 www.baidu.com image.baidu.com
- 设置 cookie domain 为主域名，即可共享 cookie
- 主域名完全不同，则 cookie 无法共享
- 可使用 sso 技术实现

# HTTP 协议 和 UDP 协议有什么区别？

## 网络协议

- HTTP 协议在应用层
- TCP UDP 协议在传输层
- 严格来说，应该拿 TCP 和 UDP 进行比较

## TCP

- 有连接（三次握手）
- 有断开（四次挥手）
- 稳定传输

## UDP

- 无连接，无断开
- 不稳定传输，但效率高
- 如视频会议、语音通话

# HTTP 协议 和 1.0 1.1 2.0 有什么区别？

## HTTP 1.0

- 最基础的 HTTP 协议
- 支持基本的 GET POST 方法

## HTTP 1.1

- 缓存策略 cache-control e-tag 等网络相关知识
- 支持长链接 Connection:keep-alive，一次 TCP 连接多次请求
- 断点续传，状态码 206
- 支持新的方法 PUT DELETE 等，可用于 RESTFUL API

## HTTP 2.0

- 可压缩 header ，减少体积
- 多路复用，一次 TCP 连接中可以多个 HTTP 并行请求
- 服务端推送

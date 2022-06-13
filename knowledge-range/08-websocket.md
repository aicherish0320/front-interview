# WebSocket

# WebSocket 和 http 长轮询的区别？

- HTTP 长轮询：客户端发起请求，服务端阻塞，不会立即返回
- WebSocket：客户端可发起请求，服务端也可发起请求

**注意**：HTTP 长轮询，需处理 timeout，即 timeout 之后重新发请求

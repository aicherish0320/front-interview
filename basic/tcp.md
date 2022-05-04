# 请描述 TCP 三次握手和四次挥手

## 建立 TCP 连接

- 先建立连接（确保双方都有收发消息的能力）
- 再传输内容（如发送给一个 get 请求）
- 网络连接是 TCP 协议，传输内容是 HTTP 协议

### 三次握手 - 建立连接

- Client 发包，Server 接收。Server：有 Client 要找我
- Server 发包，Client 接收。Client：Server 已经收到信息了
- Client 发包，Server 接收。Server：Client 要准备发送了

### 四次挥手 - 关闭连接

- Client 发包，Server 接收。Server：Client 已请求结束
- Server 发包，Client 接收。Client：Server 已收到，我等待它关闭
- Server 发包，Client 接收。Client：Server 此时可以关闭连接了
- Client 发包，Server 接收。Server：可以关闭了

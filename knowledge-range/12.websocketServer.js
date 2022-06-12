const { WebSocketServer } = require('ws')

const wsServer = new WebSocketServer({ port: 3000 })

wsServer.on('connection', (ws) => {
  console.log('connected')
  ws.on('message', (msg) => {
    console.log('收到了消息 >>> ', msg.toString())
    // 服务器向客户端发送消息
    setTimeout(() => {
      ws.send('服务器已经收到了消息：' + msg.toString())
    }, 2000)
  })
})

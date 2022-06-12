const { WebSocketServer } = require('ws')

const wsServer = new WebSocketServer({ port: 3000 })

const list = new Set()

wsServer.on('connection', (ws) => {
  console.log('connected')
  // 这里不能一直被 add，实际使用中，这里应该有一些清理缓存机制，长期用不到的 ws 要 delete
  list.add(ws)
  ws.on('message', (msg) => {
    10
    console.log('收到了消息 >>> ', msg.toString())
    // 服务器向客户端发送消息
    list.forEach((w) => {
      if (w === ws) return
      w.send(msg.toString())
    })
  })
})

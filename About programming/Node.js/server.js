const http = require('http') // 引入http模块

const hostname = '127.0.0.1'
const port = 3000

// 创建web服务器
const server = http.createServer((req, res) => {
    // req为来自客户端的请求
    // res为服务应答
    res.statusCode = 200 // 设置状态码
    res.setHeader('Content-Type', 'text/plain') // 设置响应头字段
    res.end('Hello World\n') // 发送消息并结束本次连接
})

// 启动服务器
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`) // 启动成功后输出信息
})

import express from 'express'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'

const server = express()
const port = 9000;
const cors = require('cors')

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}))


const app = server.listen(port, function (err, result) {
    console.log('running in port http://localhost:' + port)
})

server.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

server.post('/newpatient', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var data = req.body;
    console.log(data)
    res.send(data)
});

const io = socketIO.listen(app);
// รอการ connect จาก client
io.on('connection', client => {
    console.log('user connected')

    // เมื่อ Client ตัดการเชื่อมต่อ
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})

export default server
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 3001
const cors = require('cors')
app.use(cors())

const roomsController = require('./controllers/roomsController')

const roomRoutes = require('./routes/roomRoutes')
app.use('/rooms', roomRoutes)

const { Server } = require('socket.io')
const { rooms } = require('./controllers/roomsController')
// Quando vamos conectar com alguma pagina fora do proprio server, nós devemos configurar o cors pelo prorio socket, e não pelo express
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

io.on('connection', (socket) => {
  // socket.on('create', (room, callback) => {
  //   if (!io.sockets.adapter.rooms.has(room)) {
  //     socket.join(room)
  //     console.log(room)
  //   } else {
  //     callback({ err: 'room already created' })
  //   }
  // })

  socket.on('join', (room, callback) => {
    if (!io.sockets.adapter.rooms.has(room) || io.sockets.adapter.rooms.get(room).size < 5) {
      socket.join(room)
      // roomsController.rooms[room].users.push()
      console.log(io.sockets.adapter.rooms)
      console.log(io.sockets.adapter.rooms.get(room))
    } else {
      callback({ err: 'room is full' })
    }
  })
  socket.on('am-i-ready', (roomId, userId, isReady) => {
    const user = roomsController.rooms[roomId].users.find(({id}) => id === userId)
    user.isReady = isReady
    io.to(roomId).emit('are-everyone-ready', roomsController.isEveryoneReady())
  })
})

server.listen(port, () => {
  console.log('Server Running on port ' + port)
}).on('error', (err) => {
  console.log(err)
})
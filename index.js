const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 3000
const cors = require('cors')
app.use(cors())

// const roomRoutes = require('./routes/roomRoutes')
// app.use('/rooms', roomRoutes)

const { Server } = require('socket.io')
const { rooms } = require('./controllers/roomsController')
// Quando vamos conectar com alguma pagina fora do proprio server, nós devemos configurar o cors pelo prorio socket, e não pelo express
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

io.on('connection', (socket) => {
  socket.on('create', (room, callback) => {
    if (!io.sockets.adapter.rooms.has(room)) {
      socket.join(room)
    } else {
      callback({ err: 'room already created' })
    }
  })

  socket.on('join', (room, callback) => {
    console.log(io.sockets.adapter.rooms.get(room))
    if (io.sockets.adapter.rooms.has(room)) {
      if (io.sockets.adapter.rooms.has(room) && io.sockets.adapter.rooms.get(room).size < 5) {
        socket.join(room)
      } else {
        callback({ err: 'room is full' })
      }
    } else {
      callback({ err: 'any room with this name' })
    }
  })
})

server.listen(port, () => {
  console.log('Server Running on port ' + port)
}).on('error', (err) => {
  console.log(err)
})
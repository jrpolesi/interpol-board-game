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

// const gameRoutes = require('./routes/gameRoutes')
// app.use('/game', gameRoutes)

const { Server } = require('socket.io')

// Quando vamos conectar com alguma pagina fora do proprio server, nós devemos configurar o cors pelo prorio socket, e não pelo express
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, callback) => {
    const currentRoom = roomsController.rooms[roomId]
    if (currentRoom) {
      const maxUsers = currentRoom.maxUsers
      if (currentRoom.users.length < maxUsers) {
        socket.join(roomId)
        roomsController.addUserRoom(roomId, socket.id)
        // const preferences = roomsController.getGame(roomId).getPreferencesAvailable()
        // io.to(roomId).emit('preferencesAvailable', preferences)
        // console.log(io.sockets.adapter.rooms.get(roomId))
      } else {
        callback({ err: 'room is full' })
      }
    } else {
      callback({ err: 'Room not find' })
    }
    console.log(roomsController.rooms)
  })

  socket.on('disconnecting', () => {
    const roomId = [...socket.rooms].find((roomId) => roomId !== socket.id)
    if (roomId) {
      roomsController.deleteUserRoom(roomId, socket.id)
    }
  })

  // socket.on('am-i-ready', (roomId, isReady) => {
  //   const user = roomsController.rooms[roomId].users.find(({ id }) => id === socket.id)
  //   user.isReady = isReady
  //   io.to(roomId).emit('are-everyone-ready', roomsController.isEveryoneReady(roomId))
  // })

  // socket.on('player-change-preferences', (roomId, changes) =>{
  //   const currentGame = roomsController.getGame(roomId)
  //   currentGame.updatePreferences({id: socket.id, ...changes})
  //   io.to(roomId).emit('player-change-preferences', currentGame.getPreferencesAvailable())
  // })
})

server.listen(port, () => {
  console.log('Server Running on port ' + port)
}).on('error', (err) => {
  console.log(err)
})
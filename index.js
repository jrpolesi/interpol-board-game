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
        const preferences = roomsController.getPreferencesAvailable(roomId)
        io.to(socket.id).emit('preferencesAvailable', preferences)
        // console.log(io.sockets.adapter.rooms.get(roomId))
      } else {
        callback({ err: 'room is full' })
      }
    } else {
      callback({ err: 'Room not find' })
    }
  })

  socket.on('disconnecting', () => {
    const roomId = [...socket.rooms].find((roomId) => roomId !== socket.id)
    if (roomId) {
      const game = roomsController.getGame(roomId)
      game.removePlayer(socket.id)
      io.to(roomId).emit('players-update', game.players)
      roomsController.deleteUserRoom(roomId, socket.id)
    }
    for (let roomId in roomsController.rooms) {
      if (roomsController.rooms[roomId].users.length < 1) {
        delete roomsController.rooms[roomId]
        break
      }
    }
  })

  socket.on('am-i-ready', (roomId, isReady) => {
    const user = roomsController.getUser(roomId, socket.id)
    user.isReady = isReady
    const game = roomsController.getGame(roomId)
    const { color, type } = user.preference
    game.addNewPlayer(socket.id, color, type)
    io.to(roomId).emit('are-everyone-ready', roomsController.isEveryoneReady(roomId))
    if (roomsController.isEveryoneReady(roomId)) {
      io.to(roomId).emit('stations', game.stations)
      const players = game.players
      const currentPlayer = players[game.currentPlayer].id
      io.to(roomId).emit('players-update', players, currentPlayer)
    }
  })

  socket.on('player-change-preferences', (roomId, changes) => {
    roomsController.updateUserPreferences(roomId, socket.id, changes)
    const preferences = roomsController.getPreferencesAvailable(roomId)
    io.to(roomId).emit('new-change', preferences)
  })

  //Criar evento para mudança de posição 
  socket.on('player-change-position', (roomId, playersUpdate) => {
    const game = roomsController.getGame(roomId)
    game.players = playersUpdate
    game.currentPlayer++
    game.round--
    if(game.currentPlayer >= game.players.length){
      game.currentPlayer = 0
    }
    const currentPlayer = game.players[game.currentPlayer].id
    let endGame = game.finishGame()
    io.to(roomId).emit('players-update', game.players, currentPlayer, endGame)
  })
})
server.listen(port, () => {
  console.log('Server Running on port ' + port)
}).on('error', (err) => {
  console.log(err)
})
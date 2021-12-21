const { Room, User } = require('../models/roomModels')

const roomsControllers = {
  rooms: {},
  new: function (req, res) {
    const maxUsers = req.body.maxUsers || 5
    const newRoom = new Room(maxUsers)
    const roomId = Room.idGenerator()
    this.rooms[roomId] = newRoom
    res.send(roomId)
  },
  delete: function (req, res) {
    const idToDelete = req.body.roomId
    delete this.room[idToDelete]
  },
  hasRoom: function (req, res) {
    const { roomId } = req.params
    if (this.rooms[roomId]) {
      res.send({ exist: true })
    } else {
      res.send({ exist: false })
    }
  },
  isEveryoneReady: function (roomId) {
    this.room[roomId].isReady = this.room[roomId].users.every(({ isReady }) => isReady)
  },
  addUserRoom: function (roomId, userId) {
    const user = new User(userId)
    this.room[roomId].users.push(user)
  },
  deleteUserRoom: function (roomId, userId) {
    const filteredUsers = this.room[roomId].users.filter(({ id }) => id !== userId)
    this.room[roomId].users = filteredUsers
  },
}
module.exports = roomsControllers
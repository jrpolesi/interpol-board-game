const { Room, User } = require('../models/roomModels')
const { Game } = require('../models/gameModels')

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
    delete this.rooms[idToDelete]
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
    this.rooms[roomId].isReady = this.rooms[roomId].users.every(({ isReady }) => isReady)
    return this.rooms[roomId].isReady
  },

  addUserRoom: function (roomId, userId) {
    const user = new User(userId)
    this.rooms[roomId].users.push(user)
  },

  deleteUserRoom: function (roomId, userId) {
    const filteredUsers = this.rooms[roomId].users.filter(({ id }) => id !== userId)

    this.rooms[roomId].users = filteredUsers
  },

  getUser: function (roomId, userId) {
    if (this.rooms[roomId]) {
      return this.rooms[roomId].users.find(({ id }) => id === userId)
    }
  },

  getPreferencesAvailable(roomId) {
    if (this.rooms[roomId]) {
      const preferences = this.rooms[roomId].users.map(({ preference }) => preference)
      const usedColors = preferences.map(({ color }) => color)
      const usedTypes = preferences.map(({ type }) => type)
      const color = this.rooms[roomId].preferences.color.filter((color) => !usedColors.includes(color))
      const type = this.rooms[roomId].preferences.type.filter((type) => !usedTypes.includes(type))

      return { color, type }
    }
  },

  updateUserPreferences(roomId, userId, newPreference) {
    const user = this.getUser(roomId, userId)

    if (user) {
      user.preference = newPreference
    }
  },

  getGame: function (roomId) {
    if (this.rooms[roomId]) {
      return this.rooms[roomId].game
    }
  }

}
module.exports = roomsControllers
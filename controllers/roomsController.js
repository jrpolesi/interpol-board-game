class Room {
  constructor(playersCapacity) {
    this.id = Room.idGenerator()
    this.playersCapacity = playersCapacity
  }
  static idGenerator() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }
}

const roomsControllers = {
  rooms: [],
  newRoom: function (req, res) {
    const playersCapacity = req.body.playersCapacity || 4
    const newRoom = new Room(playersCapacity)
    this.rooms.push(newRoom)
    res.send(newRoom.id)
  },
  deleteRoom: function (req, res) {
    const idToDelete = req.body.roomId
    this.rooms = this.rooms.filter(({ id }) => id !== idToDelete)
    res.sendStatus(200)
  }
}
module.exports = roomsControllers
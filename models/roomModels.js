const { Game } = require("./gameModels")

class Room {
  constructor(maxUsers) {
    this.maxUsers = maxUsers
    this.users = []
    this.isReady = false
    this.preferences = {
      color: ['red', 'green', 'blue', 'black', 'yellow'],
      type: ['police1', 'police2', 'police3', 'police4', 'thief']
    }
    this.game = new Game()
  }
  static idGenerator() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }
}

class User {
  constructor(id) {
    this.id = id
    this.isReady = false
    this.preference = {}
  }
}

module.exports = { Room, User }
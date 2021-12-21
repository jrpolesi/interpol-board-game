class Room {
  constructor(maxUsers) {
    this.maxUsers = maxUsers
    this.users = []
    this.isReady = false
  }
  static idGenerator() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }
}

class User {
  constructor(id) {
    this.id = id
    this.isReady = false
  }
}

module.exports = {Room, User}
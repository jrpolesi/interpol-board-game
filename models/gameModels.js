const { stations } = require('./stationModel')
class Player {
  constructor(id, color, position) {
    this.id = id
    this.color = color
    this.position = position
    this.type = 'police'
    this.hidden = false
  }
  move(transport, toPosition) {

  }
}

class Thief extends Player {
  constructor(id, color, position) {
    super(id, color, position)
    this.type = 'thief'
    this.hidden = true
  }
}

class Game {
  constructor() {
    this.players = []
    this.thief = ''
    this.stations = stations
    this.currentPlayer = ''
    this.round = 20
  }
  thiefWasArrested() {

  }

  addNewPlayer(id, color, position, type) {
    let player
    if (type === 'thief') {
      player = new Thief(id, color, position)
    } else {
      player = new Player(id, color, position)
    }
    this.players.push(player)
  }

  removePlayer(playerId) {
    const filteredPlayers = this.players.filter(({ id }) => id !== playerId)
    this.players = filteredPlayers
  }

  getPlayer(playerId) {
    const player = this.players.find(({ id }) => id === playerId)
    return player
  }
}


module.exports = { Player, Game }

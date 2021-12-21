class Player {
  constructor(id, type, color, hidden, position) {
    this.id = id
    this.type = type
    this.color = color
    this.hidden = hidden
    this.position = position
  }
  move(transport, toPosition) {

  }
}

class Game {
  constructor() {
    this.players = []
    this.thief = ''
    this.colors = ['red', 'green', 'blue', 'black', 'yellow']
    this.types = ['police1', 'police2', 'police3', 'police4', 'thief']
    this.usedColors = []
    this.usedTypes = []
  }
  thiefWasArrested() {

  }

  addNewPlayer(id, className, color, hidden, position) {
    const player = new Player(id, className, color, hidden, position)
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

  getPreferencesAvailable() {
    return({
      color: this.colors.filter((color) => !this.usedColors.includes(color)),
      type: this.types.filter((type) => !this.usedTypes.includes(type))
    })
  }
}


module.exports = { Player, Game }

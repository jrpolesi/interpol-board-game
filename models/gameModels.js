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
    this.preferences = {
      color: ['red', 'green', 'blue', 'black', 'yellow'],
      type: ['police1', 'police2', 'police3', 'police4', 'thief']
    }
    this.userPreferences = []
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

  updatePreferences(newPreference) {
    const userIndex = this.userPreferences.findIndex(({ id }) => {
      return id === newPreference.id
    })
    if (userIndex > -1) {
      this.userPreferences[userIndex] = newPreference
    } else {
      this.userPreferences.push(newPreference)
    }
  }

  getPreferencesAvailable() {
    const usedColors = this.userPreferences.map(({ color }) => color)
    const usedTypes = this.userPreferences.map(({ type }) => type)
    const color = this.preferences.color.filter((color) => !usedColors.includes(color))
    const type = this.preferences.type.filter((type) => !usedTypes.includes(type))

    return {color, type}
  }
}


module.exports = { Player, Game }

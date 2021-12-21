const { Player } = require('../models/gameModels')

const game = {
  players: [],
  thief: '',
  colorsAvailable: ['red', 'green', 'blue', 'black', 'yellow'],
  typesAvailable: ['police1', 'police2', 'police3', 'police4', 'thief'],
  thiefWasArrested: function () {

  },

  addNewPlayer: function (id, className, color, hidden, position) {
    const player = new Player(id, className, color, hidden, position)
    this.players.push(player)
  },

  removePlayer: function (playerId) {
    const filteredPlayers = this.players.filter(({ id }) => id !== playerId)
    this.players = filteredPlayers
  },

  getPlayer: function (playerId) {
    const player = this.players.find(({ id }) => id === playerId)
    return player
  },

  getPreferencesAvailable: function(req, res){
    console.log(this.colorsAvailable)
    res.send ({
      color: this.colorsAvailable,
      type: this.typesAvailable
    })
  }
}

module.exports = game
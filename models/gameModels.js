const { stations } = require('./stationModel')
class Player {
  constructor(id, color, position) {
    this.id = id
    this.color = color
    this.position = position
    this.type = 'police'
    this.hidden = false
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
    this.currentPlayer = 0
    this.round = 20
  }

  finishGame() {
    if (this.round <= 0) {
      return 'Thief Wins'
    } else if (this.thiefWasArrested()) {
      return 'Police Wins'
    } else {
      return false
    }
  }

  thiefWasArrested() {
    let thiefPosition

    const playersPosition = this.players.reduce((acc, { position, type }) => {
      if (type === 'thief') {
        thiefPosition = position
      } else {
        acc.push(position)
      }
      return acc
    }, [])

    if (playersPosition.includes(thiefPosition)) {
      return true
    } else {
      return false
    }
  }

  getRandomPosition() {
    const position = Math.floor(Math.random() * 10) //stations.length

    const playersPosition = this.players.map(({ position }) => position)

    if (playersPosition.includes(position)) {
      return this.getRandomPosition()
    }
    return position
  }

  addNewPlayer(id, color, type) {
    const position = this.getRandomPosition()
    let player

    if (type === 'thief') {
      player = new Thief(id, color, position)
      this.thief = player
      this.currentPlayer = this.players.length
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

  updateThiefHidden(thief) {
    const roundsToShow = [19, 13, 7, 2]

    if (roundsToShow.includes(this.round)) {
      thief.hidden = false
    } else {
      thief.hidden = true
    }
  }
}


module.exports = { Player, Game }

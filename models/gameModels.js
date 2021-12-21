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

module.exports = { Player }

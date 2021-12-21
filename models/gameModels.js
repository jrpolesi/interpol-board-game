class Player {
  constructor(id, className, color, hidden, position) {
    this.id = id
    this.className = className
    this.color = color
    this.hidden = hidden
    this.position = position
  }
  move(transport, toPosition){

  }
}

class Game {
  constructor(players, thief){
    this.players = players
    this.thief = thief
  }
  thiefWasArrested(){

  }
}

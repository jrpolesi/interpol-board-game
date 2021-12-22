import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'


export function TransportsButtons() {
  const {socket, players, stations} = useContext(GameContext)
  function handleClick(event){
    const player = players.find(({ id }) => id === socket.id)
    const currentStation = stations[player.position]
    console.log(currentStation)
  }
  return (
    <div onClick={handleClick}>
      <button>Barco</button>
      <button>Metro</button>
      <button>Taxi</button>
      <button>Ônibus</button>
    </div>
  )
}
import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'


export function TransportsButtons() {
  const {socket} = useContext(GameContext)
  function handleClick(event){
    console.log(socket)
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
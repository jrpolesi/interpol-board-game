import React, { useState } from 'react'
import { GameBoard } from '../../components/GameBoard'
import { GameProvider } from '../../Contexts/GameContext'

export function Game() {
  const [num, setNum] = useState(2)
  function handleClick() {
    setNum(prev => prev + 1)
  }
  return (
    <GameProvider>
      <button onClick={handleClick}>{num}</button>
      <GameBoard />
    </GameProvider>
  )
}
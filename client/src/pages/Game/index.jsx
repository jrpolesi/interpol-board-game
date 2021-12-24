import React from 'react'
import { GameBoard } from '../../components/GameBoard'
import { GameProvider } from '../../Contexts/GameContext'

export function Game() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  )
}
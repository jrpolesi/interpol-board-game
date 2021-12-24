import React, { useContext } from 'react'
import { ModalNewPlayer } from '../../components/ModalNewPlayer'
import { GameContext } from '../../Contexts/GameContext'
import { Canvas } from '../Canvas'
import { Container } from './style'
import { GameInteraction } from '../GameInteraction'
import { GameInfo } from '../GameInfo'



export function GameBoard() {
  const { areEveryoneReady } = useContext(GameContext)
  return (
    <Container>
      {areEveryoneReady || <ModalNewPlayer />}
      <GameInfo />
      <GameInteraction />
      <Canvas />
    </Container>
  )
}
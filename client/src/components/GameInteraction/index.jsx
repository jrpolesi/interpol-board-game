import React from 'react'
import { GameInfo } from '../GameInfo'
import { GameControls } from '../GameControls'
import { ThiefHistoric } from '../ThiefHistoric'
import { Container } from './style'


export function GameInteraction() {
  return (
    <Container>
      <GameInfo />
      <GameControls />
      <ThiefHistoric />
    </Container>
  )
}
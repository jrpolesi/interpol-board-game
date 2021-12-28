import React from 'react'
import { GameControls } from '../GameControls'
import { GameInfo } from '../GameInfo'
import { Container } from './style'


export function GameInteraction() {
  return (
    <Container>
      <GameInfo />
      <GameControls />
    </Container>
  )
}
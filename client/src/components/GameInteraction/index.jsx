import React from 'react'
import { GameInfo } from '../GameInfo'
import { ThiefHistoric } from '../ThiefHistoric'
import { Container } from './style'


export function GameInteraction() {
  return (
    <Container>
      <GameInfo />
      <ThiefHistoric />
    </Container>
  )
}
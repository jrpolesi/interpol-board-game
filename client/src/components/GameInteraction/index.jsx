import React from 'react'
import { GameControls } from '../GameControls'
import { ThiefHistoric } from '../ThiefHistoric'


export function GameInteraction() {
  return (
    <section>
      <GameControls />
      <ThiefHistoric />
    </section>
  )
}
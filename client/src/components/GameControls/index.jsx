import React, { useContext } from 'react'
// import { GameContext } from '../../Contexts/GameContext'
// import { ThiefButtons } from '../ThiefButtons'
import { TransportsButtons } from '../TransportsButtons'
import { Container } from './style'


export function GameControls() {
  // const { me } = useContext(GameContext)

  return (
    <Container>
      <TransportsButtons />
      {/* {me && me.type === 'thief' && <ThiefButtons />} */}
    </Container>
  )
}
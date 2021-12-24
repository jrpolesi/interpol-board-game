import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function GameInfo() {
  const {me, canIPlay} = useContext(GameContext)
  return (
    <Container>
      <span>
        {me && me.color}
        <br/>
        {canIPlay ? 'Sua vez de jogar' : 'É a vez dos seus colegas'}
      </span>
    </Container>
  )
}
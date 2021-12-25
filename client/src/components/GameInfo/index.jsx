import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function GameInfo() {
  const { me, canIPlay, round } = useContext(GameContext)
  return (
    <Container>
      {me &&
        <div style={{ color: me.color }}>
          {me.color}
        </div>
      }
      <div>
        {canIPlay ? 'Sua vez de jogar' : 'É a vez dos seus colegas'}
      </div>
      <div>
        Round: {round}
      </div>
    </Container>
  )
}
import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { FormNewPlayer } from '../FormNewPlayer'
import { WaitOthersPlayers } from '../WaitOthersPlayers'
import { Container } from './style'


export function ModalNewPlayer() {
  const { amIReady } = useContext(GameContext)
  return (
    <Container>
      <section>
        <h2>Escolha seu pino</h2>
        {amIReady ?
          <WaitOthersPlayers /> :
          <FormNewPlayer />}
      </section>
    </Container>
  )
}
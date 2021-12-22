import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { FormNewPlayer } from '../FormNewPlayer'
import {Container} from './style'
 

export function ModalNewPlayer() {
  const { amIReady } = useContext(GameContext)
  return (
    <section>
      {amIReady ? 
      "Aguarde os outros jogadores" :
      <FormNewPlayer />}
    </section>
  )
}
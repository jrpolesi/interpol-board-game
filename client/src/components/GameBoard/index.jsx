import React, {useContext} from 'react'
import { ModalNewPlayer } from '../../components/ModalNewPlayer'
import { GameContext } from '../../Contexts/GameContext'


export function GameBoard() {
  const { areEveryoneReady } = useContext(GameContext)
  return (
    <section>
    {areEveryoneReady || <ModalNewPlayer />}
    </section>
  )
}
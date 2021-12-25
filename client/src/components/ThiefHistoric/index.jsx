import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'


export function ThiefHistoric() {

  const { thiefMovements } = useContext(GameContext)

  return (
    <section>
      <h3>Ultimos transportes</h3>
      <ul>
        {thiefMovements.map(({ round, vehicle }) => (
          <li key={round}>
            <span>{round}</span>
            <span>{vehicle}</span>
          </li>))}
      </ul>
    </section>
  )
}
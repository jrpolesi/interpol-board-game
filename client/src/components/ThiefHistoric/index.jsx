import React, { useContext, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function ThiefHistoric() {
  const [showList, setShowList] = useState(false)
  const { thiefMovements } = useContext(GameContext)

  function toggleListVisibility() {
    setShowList(prevState => !prevState)
  }

  return (
    <Container>
      <h3 onClick={toggleListVisibility}
        className={showList ? 'up' : ''}>
        Histórico do ladrão
      </h3>
      {showList && thiefMovements &&
        <ul>
          {thiefMovements.map(({ round, vehicle }) => (
            <li key={round}>
              <span className='thief-historic__round'>Round {round}: </span>
              <span className='thief-historic__vehicle'>{vehicle}</span>
            </li>))}
        </ul>}
    </Container>
  )
}
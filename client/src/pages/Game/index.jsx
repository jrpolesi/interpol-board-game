import React, { useContext, useEffect, useState } from 'react'
import { FormNewPlayer } from '../../components/FormNewPlayer'
import { GameProvider } from '../../Contexts/GameContext'

export function Game() {
  const [num, setNum] = useState(2)
  function handleClick() {
    setNum(prev => prev + 1)
  }
  return (
    <GameProvider>
      <button onClick={handleClick}>{num}</button>
      {/* <FormNewPlayer /> */}
    </GameProvider>
  )
}
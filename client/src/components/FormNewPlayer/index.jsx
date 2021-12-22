import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function FormNewPlayer() {
  const { colorsAndTypesAvailable, setAmIReady } = useContext(GameContext)

  function toggleAmIReady(){
    setAmIReady(prevState => !prevState)
  }

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      {colorsAndTypesAvailable && <>
        <select name="type" id="playerColor"  >
          {colorsAndTypesAvailable.type.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <select name="color" id="playerColor">
          {colorsAndTypesAvailable.color.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>
        <button onClick={toggleAmIReady}>Estou pronto</button></>}
    </Container>
  )
}
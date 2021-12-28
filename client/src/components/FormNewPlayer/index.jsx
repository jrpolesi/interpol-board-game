import React, { useContext } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function FormNewPlayer() {
  const { colorsAndTypesAvailable, setAmIReady, currentPreferences, setCurrentPreferences } = useContext(GameContext)


  function toggleAmIReady(event) {
    event.preventDefault()

    setAmIReady(prevState => !prevState)
  }

  function handleFormChange(event) {
    const { name, value } = event.target

    setCurrentPreferences((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  function translateColor(color) {
    switch (color) {
      case 'green':
        return 'verde'
        break
      case 'blue':
        return 'azul'
        break
      case 'red':
        return 'vermelho'
        break
      case 'yellow':
        return 'amarelo'
        break
      case 'black':
        return 'preto'
        break
      default:
        return
    }
  }

  function translateType(type) {
    const number = type.slice(-1)
    return type.includes('police') ? `policia ${number}` : 'ladrão'
  }

  return (
    <Container onSubmit={toggleAmIReady} className='userPreferences'>
      {colorsAndTypesAvailable && currentPreferences && <>
        <select name="type" id="playerColor" value={currentPreferences.type} onChange={handleFormChange}>
          {colorsAndTypesAvailable.type.map((type) => (
            <option
              key={type}
              value={type}
            >
              {translateType(type)}
            </option>
          ))}
        </select>
        <select name="color" id="playerColor" value={currentPreferences.color} onChange={handleFormChange}>
          {colorsAndTypesAvailable.color.map((color) => (
            <option
              key={color}
              value={color}
            >
              {translateColor(color)}
            </option>
          ))}
        </select>
        <button>Estou pronto</button>
      </>}
    </Container>
  )
}
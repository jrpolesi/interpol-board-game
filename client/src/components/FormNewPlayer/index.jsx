import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function FormNewPlayer() {
  const { colorsAndTypesAvailable, setColorsAndTypesAvailable, setAmIReady, socket, room } = useContext(GameContext)
  const [formData, setFormData] = useState()

  useEffect(() => {
    if (!formData && colorsAndTypesAvailable) {
      const color = colorsAndTypesAvailable.color[0]
      const type = colorsAndTypesAvailable.type[0]

      setFormData({ color, type })
    }
  }, [colorsAndTypesAvailable, formData])

  useEffect(() => {
    if (socket && formData) {
      socket.emit('player-change-preferences', room, formData)

      socket.on('new-change', (changes) => {
        const newPreferences = JSON.parse(JSON.stringify(changes))

        newPreferences.color.push(formData.color)
        newPreferences.type.push(formData.type)

        setColorsAndTypesAvailable(newPreferences)
      })

      return () => { socket.off('new-change') }
    }
  }, [formData, socket, room])

  function toggleAmIReady(event) {
    event.preventDefault()

    setAmIReady(prevState => !prevState)
  }

  function handleFormChange(event) {
    const { name, value } = event.target

    setFormData((prevState) => ({
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
    }
  }

  function translateType(type) {
    const number = type.slice(-1)
    return type.includes('police') ? `policia ${number}` : 'ladrão'
  }

  return (
    <Container onSubmit={toggleAmIReady}>
      {colorsAndTypesAvailable && formData && <>
        <select name="type" id="playerColor" value={formData.type} onChange={handleFormChange}>
          {colorsAndTypesAvailable.type.map((type) => (
            <option
              key={type}
              value={type}
            >
              {translateType(type)}
            </option>
          ))}
        </select>
        <select name="color" id="playerColor" value={formData.color} onChange={handleFormChange}>
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
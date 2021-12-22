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
        setColorsAndTypesAvailable((prevState) =>{
          return newPreferences
        })
      })
      return () => {socket.off('new-change')}
    }
  }, [formData, socket, room])

  function toggleAmIReady() {
    setAmIReady(prevState => !prevState)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      {colorsAndTypesAvailable && formData && <>
        <select name="type" id="playerColor" value={formData.type} onChange={handleChange}>
          {colorsAndTypesAvailable.type.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <select name="color" id="playerColor" value={formData.color} onChange={handleChange}>
          {colorsAndTypesAvailable.color.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>
        <button onClick={toggleAmIReady}>Estou pronto</button></>}
    </Container>
  )
}
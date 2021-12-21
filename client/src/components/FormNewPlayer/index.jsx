import React, { useContext, useEffect, useState } from 'react'
import { ConnectionContext } from '../../ConnectionContext'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'


export function FormNewPlayer() {
  const { setAmIReady, socket, room } = useContext(ConnectionContext)
  const { preferencesAvailable } = useContext(GameContext)
  const [formData, setFormData] = useState({})
  
  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  function toggleAmIReady() {
    setAmIReady((prevState) => !prevState)
  }
  useEffect(() => {
    setFormData({
      type: preferencesAvailable.type[0],
      color:preferencesAvailable.color[0]
      })
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('player-change-preferences', room, formData)
    }
  }, [formData])

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <select name="type" id="playerColor" value={formData.type} onChange={handleChange}>
        {preferencesAvailable.type.map((type) => <option key={type} value={type}>{type}</option>)}
      </select>
      <select name="color" id="playerColor" value={formData.color} onChange={handleChange}>
        {preferencesAvailable.color.map((color) => <option key={color} value={color}>{color}</option>)}
      </select>
      <button onClick={toggleAmIReady}>Estou pronto</button>
    </Container>
  )
}
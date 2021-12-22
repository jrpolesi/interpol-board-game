import React, { useContext, useEffect, useState } from 'react'
import { Container } from './style'


export function FormNewPlayer() {
  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      {/* <select name="type" id="playerColor" value={formData.type} onChange={handleChange}>
        {preferencesAvailable.type.map((type) => <option key={type} value={type}>{type}</option>)}
      </select>
      <select name="color" id="playerColor" value={formData.color} onChange={handleChange}>
        {preferencesAvailable.color.map((color) => <option key={color} value={color}>{color}</option>)}
      </select>
      <button onClick={toggleAmIReady}>Estou pronto</button> */}
    </Container>
  )
}
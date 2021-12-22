import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


const GameContext = createContext()

function GameProvider(props) {
  const [socket, setSocket] = useState()
  const [room] = useState(useParams().roomId)
  const [colorsAndTypesAvailable, setColorsAndTypesAvailable] = useState()

  useEffect(() => {
    const connection = io('/')
    connection.on('connect', () => {
      setSocket(connection)
    })
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('join-room', room, (err) => {
        if (err) {
          window.location.href = "/"
        }
      })
      socket.on('preferencesAvailable', (preferences) => {
        console.log(preferences)
        setColorsAndTypesAvailable(preferences)
      })
    }
  }, [socket, room])

  const values = { socket, room, colorsAndTypesAvailable }
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


const GameContext = createContext()

function GameProvider(props) {
  const [socket, setSocket] = useState()
  const [room] = useState(useParams().roomId)

  useEffect(() => {
    const connection = io('/')
    connection.on('connect', () => {
      setSocket(connection)
    })
  }, [])

  useEffect(() => {
    if (socket) {
      console.log(socket)
      socket.emit('join-room', room, (err) => {
        if (err) {
          window.location.href = "/"
        }
      })
    }
  }, [socket, room])

  const values = { socket, room }
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
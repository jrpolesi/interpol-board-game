import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


const GameContext = createContext()

function GameProvider(props) {
  const [socket, setSocket] = useState()
  const [room, setRoom] = useState(useParams())

  useEffect(() => {
    const connection = io('/')
    connection.on('connect', () => {
      setSocket(connection.id)
    })
  }, [])


  const values = {}
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
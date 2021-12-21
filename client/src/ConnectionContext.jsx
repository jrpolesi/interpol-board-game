import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const ConnectionContext = createContext()

function ConnectionProvider(props) {
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(null)
  const [amIReady, setAmIReady] = useState(false)
  const [areEveryoneReady, setAreEveryoneReady] = useState(false)
  const [preferencesAvailable, setPreferencesAvailable] = useState({type:[], color:[]})

  useEffect(() => {
    if (room) {
      socket.emit('join', room, (err) => {
        if (err) console.log(err)
      })
      socket.on('preferencesAvailable', (preferences) => {
        setPreferencesAvailable(preferences)
      })
      socket.on('are-everyone-ready', (areReady) => {
        console.log(areReady)
        setAreEveryoneReady(areReady)
      })
    }
  }, [room, socket])

  useEffect(() => {
    if (!socket) {
      setSocket(io('/'))
    }
  }, [socket])

  useEffect(()=>{
    if(room){
      socket.emit('am-i-ready', room, amIReady)
    }
  }, [room, socket, amIReady])

  const values = { socket, setSocket, room, setRoom, amIReady, setAmIReady, areEveryoneReady, setAreEveryoneReady, preferencesAvailable, setPreferencesAvailable }
  return (
    <ConnectionContext.Provider value={values}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export { ConnectionContext, ConnectionProvider }
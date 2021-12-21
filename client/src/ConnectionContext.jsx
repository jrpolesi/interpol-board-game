import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const ConnectionContext = createContext()

function ConnectionProvider(props) {
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (room) {
      socket.emit('join', room, (err) => {
        if (err) console.log(err)
      })
    }
  }, [room])

  useEffect(() => {
    if (!socket) {
      setSocket(io('/'))
    }
  }, [socket])

  const values = { socket, setSocket, room, setRoom }
  return (
    <ConnectionContext.Provider value={values}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export { ConnectionContext, ConnectionProvider }
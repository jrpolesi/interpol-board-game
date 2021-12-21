import React, { createContext, useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../../ConnectionContext";

const GameContext = createContext()

function GameProvider(props) {
  const { socket, preferencesAvailable, setPreferencesAvailable } = useContext(ConnectionContext)
  const [players, setPlayers] = useState()
 


  useEffect(() => {
    if (socket) {
      socket.on('player-change-preferences', (changes) => {
        console.log(changes)
        // setPreferencesAvailable(changes)
      })
    }
  }, [socket])


  const values = { preferencesAvailable, setPreferencesAvailable }
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
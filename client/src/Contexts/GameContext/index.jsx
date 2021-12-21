import React, { createContext, useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../../ConnectionContext";

const GameContext = createContext()

function GameProvider(props) {
  const { socket } = useContext(ConnectionContext)
  const [players, setPlayers] = useState()
  const [preferencesAvailable, setPreferencesAvailable] = useState({type:[], color:[]})


  useEffect(() => {
    if (socket) {
      socket.on('player-change-preferences', (changes) => {
        console.log(changes)
        // setPreferencesAvailable(changes)
      })
    }
  }, [socket])

  useEffect(() => {
    async function getPrefencesAvailable() {
      const res = await fetch('/game/preferencesAvailable')
      const preferences = await res.json()
      console.log(preferences)
      setPreferencesAvailable(preferences)
    }
    getPrefencesAvailable()
  }, [])

  const values = { preferencesAvailable, setPreferencesAvailable }
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


const GameContext = createContext()

function GameProvider(props) {
  const [socket, setSocket] = useState()
  const [room] = useState(useParams().roomId)
  const [colorsAndTypesAvailable, setColorsAndTypesAvailable] = useState()
  const [currentPreferences, setCurrentPreferences] = useState()
  const [players, setPlayers] = useState()
  const [stations, setStations] = useState()
  const [amIReady, setAmIReady] = useState(false)
  const [areEveryoneReady, setareEveryoneReady] = useState(false)
  const [me, setMe] = useState()
  const [canIPlay, setCanIPlay] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState()
  const [thiefMovements, setThiefMovements] = useState([])
  const [round, setRound] = useState()

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

      socket.on('are-everyone-ready', (areReady) => {
        setareEveryoneReady(areReady)
      })

      socket.on('stations', (stations) => {
        setStations(stations)
      })

      socket.on('players-update', (players, currentPlayer, thiefMovements, round, endGame) => {
        setRound(round)
        setThiefMovements(thiefMovements)

        if (!me) {
          setMe(players.find(({ id }) => id === socket.id))
        }
        if (endGame) {
          alert(endGame)
          socket.emit('restart', room)
          setAmIReady(false)
        }

        setPlayers(players)

        const myTurn = currentPlayer === socket.id ? true : false
        setCanIPlay(myTurn)
      })
    }
  }, [socket, room])

  useEffect(() => {
    if (socket) {
      socket.on('preferences', (preferences) => {
        if (currentPreferences) {
          setColorsAndTypesAvailable({
            color: [currentPreferences.color, ...preferences.color],
            type: [currentPreferences.type, ...preferences.type]
          })
        } else {
          const color = preferences.color[0]
          const type = preferences.type[0]
          setCurrentPreferences({ color, type })
          setColorsAndTypesAvailable(preferences)
        }
      })
      return () => { socket.off('preferences') }
    }
  }, [socket, currentPreferences])


  useEffect(() => {
    if (socket && currentPreferences) {
      socket.emit('player-change-preferences', room, currentPreferences)
    }
  }, [socket, currentPreferences])

  useEffect(() => {
    if (socket) {
      socket.emit('am-i-ready', room, amIReady)
    }
  }, [room, amIReady])

  const values = {
    socket,
    room,
    colorsAndTypesAvailable,
    setColorsAndTypesAvailable,
    amIReady,
    setAmIReady,
    areEveryoneReady,
    stations,
    players,
    setPlayers,
    currentVehicle,
    setCurrentVehicle,
    canIPlay,
    me,
    round,
    thiefMovements,
    setCurrentPreferences,
    currentPreferences
  }

  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
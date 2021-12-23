import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'


const GameContext = createContext()

function GameProvider(props) {
  const [socket, setSocket] = useState()
  const [room] = useState(useParams().roomId)
  const [colorsAndTypesAvailable, setColorsAndTypesAvailable] = useState()
  const [amIReady, setAmIReady] = useState(false)
  const [areEveryoneReady, setareEveryoneReady] = useState(false)
  const [stations, setStations] = useState([])
  const [players, setPlayers] = useState()
  const [currentVehicle, setCurrentVehicle] = useState()
  const [canIPlay, setCanIPlay] = useState(false)

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
        setColorsAndTypesAvailable(preferences)
      })
      socket.on('are-everyone-ready', (areReady) => {
        setareEveryoneReady(areReady)
      })
      socket.on('stations', (stations) => {
        setStations(stations)
      })
      socket.on('players-update', (players, currentPlayer) => {
        console.log(players)
        setPlayers(players)
        if(currentPlayer === socket.id){
          setCanIPlay(true)
        } else {
          setCanIPlay(false)
        }
      })
    }
  }, [socket, room])

  useEffect(() => {
    if (socket) {
      socket.emit('am-i-ready', room, amIReady)
    }
  }, [room, amIReady])

  const values = { socket, room, colorsAndTypesAvailable, setColorsAndTypesAvailable, amIReady, setAmIReady, areEveryoneReady, stations, players,setPlayers, currentVehicle, setCurrentVehicle, canIPlay }
  return (
    <GameContext.Provider value={values}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormNewPlayer } from '../../components/FormNewPlayer'
import { ConnectionContext } from '../../ConnectionContext'
import { GameProvider } from '../../Contexts/GameContext'

export function Game() {
  const roomId = useParams().roomId
  const { setRoom, setAmIReady } = useContext(ConnectionContext)
  useEffect(() => {
    
    async function checkRooms() {
      const res = await fetch(`/rooms/${roomId}`)
      const data = await res.json()
      return data.exist
    }

    async function setCurrRoom() {
      const isCreated = await checkRooms()
      if (isCreated) {
        setRoom(roomId)
      } else {
        window.location.href = '/'
      }
    }

    setCurrRoom()
  }, [])

  function toggleAmIReady(){
    setAmIReady(prevState => !prevState)
  }

  return (
    <GameProvider>
      <FormNewPlayer />
    </GameProvider>
  )
}
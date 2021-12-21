import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ConnectionContext } from '../../ConnectionContext'

export function Game() {
  const roomId = useParams().roomId
  const { setRoom, amIReady, setAmIReady } = useContext(ConnectionContext)
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
    <>
      <div>toooop</div>
      <button onClick={toggleAmIReady}>Estou Pronto</button>
    </>
  )
}
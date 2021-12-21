import React, { useContext, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { ConnectionContext } from '../../ConnectionContext'

export function Game() {
  const roomId = useParams().roomId
  const { setRoom } = useContext(ConnectionContext)
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

  return (
    <>
      <div>toooop</div>
    </>
  )
}
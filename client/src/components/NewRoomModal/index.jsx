import React from 'react'


export function NewRoomModal() {
  function handleClick() {
    async function createRoom() {
      const res = await fetch('/rooms/new', { method: 'POST' })
      const roomId = await res.text()
      window.location.href = `./rooms/${roomId}`
    }
    createRoom()
  }
  return (
    <section>
      <h2>Jogar</h2>
      <div onClick={handleClick}>
        <h3>Criar nova sala</h3>
      </div>
    </section>
  )
}
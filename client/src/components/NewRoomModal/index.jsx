import React from 'react'


export function NewRoomModal() {
  function handleClick() {
    console.log('here')
    fetch('/rooms/new', { method: 'POST'})
      .then(res => { 
        return res.text()
      })
      .then((data) => {
        console.log(data)
        window.location.href = `./rooms/${data}`
      })
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
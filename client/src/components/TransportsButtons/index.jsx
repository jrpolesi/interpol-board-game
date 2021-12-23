import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'


export function TransportsButtons() {
  const { socket, players, stations, amIReady, setCurrentVehicle } = useContext(GameContext)
  const [buttons, setButtons] = useState([])
  function handleClick(event) {
    if(event.target.tagName !== 'BUTTON'){
      return
    }
    const vehicle = event.target.innerText
    setButtons((prevState) => {
      return prevState.map(({ name, currentVehicle, ...rest }) => {
        if (name === vehicle) {
          return {
            ...rest,
            name,
            currentVehicle: true
          }
        } else {
          return {
            ...rest,
            name,
            currentVehicle: false
          }
        }
      })
    })
    setCurrentVehicle(vehicle.toLowerCase())
  }
  useEffect(() => {
    console.log(buttons)
  }, [buttons])
  useEffect(() => {
    if (amIReady) {
      const player = players.find(({ id }) => id === socket.id)
      const { taxiTo, barcoTo, onibusTo, metroTo } = stations[player.position]
      setButtons([
        { name: 'Barco', disabled: !barcoTo, currentVehicle: false },
        { name: 'Metro', disabled: !metroTo, currentVehicle: false },
        { name: 'Onibus', disabled: !onibusTo, currentVehicle: false },
        { name: 'Taxi', disabled: !taxiTo, currentVehicle: false }
      ])
    }
  }, [players])
  return (
      <div onClick={handleClick}>
        {
          buttons.map(({ name, disabled, currentVehicle }) => {
            return <button key={name} disabled={disabled} style={{ backgroundColor: `${currentVehicle ? 'green' : 'transparent'}` }}>{name}</button>
          })
        }
      </div>
  )
}
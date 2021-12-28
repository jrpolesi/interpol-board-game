import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import { Container } from './style'
import Metro from '../../assets/images/Metro.svg'
import Onibus from '../../assets/images/Onibus.svg'
import Taxi from '../../assets/images/Taxi.svg'
import Barco from '../../assets/images/Barco.svg'
const images = {Metro, Onibus, Taxi, Barco}

export function TransportsButtons() {
  const { socket, players, stations, amIReady, setCurrentVehicle } = useContext(GameContext)
  const [buttons, setButtons] = useState([])

  function handleClick(event) {

    const vehicle = event.currentTarget.innerText
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
    if (amIReady && players && stations) {
      const player = players.find(({ id }) => id === socket.id)
      if(player){
        const { taxiTo, barcoTo, onibusTo, metroTo } = stations[player.position]
        setButtons([
          // { name: 'Barco', disabled: !barcoTo, currentVehicle: false },
          { name: 'Metro', disabled: !metroTo, currentVehicle: false },
          { name: 'Onibus', disabled: !onibusTo, currentVehicle: false },
          { name: 'Taxi', disabled: !taxiTo, currentVehicle: false }
        ])
      }
    }
  }, [players, amIReady, stations, socket])
  return (
    <Container >
      {
        buttons.map(({ name, disabled, currentVehicle }) => {
          return <button key={name} onClick={handleClick} disabled={disabled} className={currentVehicle ? 'button--active' : ''} >
            <img src={images[name]} alt={name} />
            <span>{name}</span>
          </button>
        })
      }
    </Container>
  )
}
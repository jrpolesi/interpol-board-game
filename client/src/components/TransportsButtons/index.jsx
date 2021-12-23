import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'


export function TransportsButtons() {
  const { socket, players, stations, amIReady } = useContext(GameContext)
  const [availableVehicles, setAvailableVehicle] = useState({})
  const [currentVehicle, setCurrentVehicle] = useState()
  const [oldTarget, setOldTarget] = useState()
  function handleClick(event) {
    if(oldTarget)
      oldTarget.style.backgroundColor = 'transparent'
    if (event.target.tagName === 'BUTTON') {
      event.target.style.backgroundColor = 'red'
    }
    setOldTarget(event.target)
  }
  useEffect(() => {
    if (amIReady) {
      const player = players.find(({ id }) => id === socket.id)
      const { taxiTo, barcoTo, onibusTo, metroTo } = stations[player.position]
      setAvailableVehicle({ taxiTo, barcoTo, onibusTo, metroTo })
    }
  }, [players])
  return (
    <>
      {currentVehicle && <span>{currentVehicle}</span>}
      <div onClick={handleClick}>
        <button disabled={!availableVehicles.barcoTo} >Barco</button>
        <button disabled={!availableVehicles.metroTo} >Metro</button>
        <button disabled={!availableVehicles.onibusTo} >Ônibus</button>
        <button disabled={!availableVehicles.taxiTo} >Taxi</button>
      </div>
    </>
  )
}
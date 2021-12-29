import React, { useRef, useEffect, useContext, useState } from 'react'
import { Container } from './style'
import { GameContext } from '../../Contexts/GameContext'
import { ThiefHistoric } from '../ThiefHistoric'
import backgroundCanvas from '../../assets/images/game-board.jpg'
import ambienceSound from '../../assets/sounds/ambience0.mp3'
import policeBeep from '../../assets/sounds/police_beep.mp3'

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
}

export function Canvas(props) {
  const { stations, currentVehicle, setCurrentVehicle, socket, room, players, canIPlay } = useContext(GameContext)
  const [canvasImage, setCanvasImage] = useState()
  const [dimension, setDimension] = useState({ w: 1770, h: 970 })
  const [availableStations, setAvailableStations] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const image = new Image();
    image.src = backgroundCanvas
    image.onload = function () {
      setCanvasImage(image)
    }
    

    const audio = new Audio()

    audio.src = ambienceSound

    audio.play()
    audio.loop = true
    audio.volume = .4

  }, [])

  useEffect(() => {
    if(canIPlay){
      const audio = new Audio()
      audio.src = policeBeep
      audio.volume = .6
      audio.play()
    }
  }, [canIPlay])

  useEffect(() => {
    if (players && canIPlay) {
      const player = players.find(({ id }) => id === socket.id)
      if (player) {
        const currentIndexPosition = player.position
        const currentPosition = stations[currentIndexPosition]
        const availableStations = currentPosition[`${currentVehicle}To`]
        if (availableStations) {
          setAvailableStations(availableStations)
        }
      }
    }
  }, [players, stations, currentVehicle, canIPlay, socket])

  useEffect(() => {

    function drawBusStation(ctx, x, y, available) {
      ctx.strokeStyle = available ? '#ff0000' : '#e96f6f'
      ctx.lineWidth = '2'
      ctx.beginPath()
      ctx.arc((x - .15), (y - .15), 24, 0, 360)
      ctx.stroke()
    }

    function drawTaxiStation(ctx, x, y, available) {
      ctx.strokeStyle = available ? '#000000' : '#929292'
      ctx.lineWidth = '3'
      ctx.beginPath()
      ctx.arc(x, y, 21, 0, 360)
      ctx.stroke()
    }

    function drawNumberStation(ctx, x, y, stationId, fillColor, available) {
      ctx.roundRect((x - 23), (y - 12.5), 46, 25, 5)
      ctx.strokeStyle = available ? '#000000' : '#929292'
      ctx.lineWidth = '1.5'
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.stroke()
      ctx.font = '600 20px sans-serif'
      ctx.fillStyle = available ? '#000000' : '#929292'
      ctx.textAlign = 'center'
      ctx.fillText(stationId, x, (y + 6.45))
    }


    function drawStation(ctx, station = {}, stationId, available) {
      let { x, y, subway, taxi, bus } = station
      x *= dimension.w / 1770
      y *= dimension.h / 970

      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(x, y, 19, 0, 360)
      ctx.fill()


      if (taxi) drawTaxiStation(ctx, x, y, available)

      if (bus) drawBusStation(ctx, x, y, available)

      const fillColorNumberStation = subway ? '#92d9ff' : '#FFFFFF'
      drawNumberStation(ctx, x, y, stationId, fillColorNumberStation, available)
    }

    function drawPlayer(ctx, x, y, color) {
      ctx.strokeStyle = color
      ctx.lineWidth = '6'
      ctx.beginPath()
      ctx.arc(x, (y - 1), 15, 0, 360)
      ctx.stroke()
      ctx.lineWidth = '4'
      ctx.beginPath()
      ctx.arc(x, (y - 1), 28, 0, 360)
      ctx.stroke()
    }

    function draw(ctx) {
      if (canvasImage) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(canvasImage, 0, 0, dimension.w, dimension.h)

        if (stations && players) {
          stations.forEach((station, stationId) => {
            const available = availableStations.includes(stationId)
            drawStation(ctx, station, stationId, available)
          })
          players.forEach(({ position, color, hidden, id }) => {
            let { x, y } = stations[position]
            x *= dimension.w / 1770
            y *= dimension.h / 970
            if (!hidden || (hidden && socket.id === id)) {
              drawPlayer(ctx, x, y, color)
            }
          })
        }
      }
    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context)
  }, [socket, stations, players, canvasImage, dimension, availableStations])

  function getMouseClick(event) {
    const canvas = event.target
    const size = canvas.getBoundingClientRect()
    const x = (event.clientX - size.left)
    const y = (event.clientY - size.top)
    return { x, y }
  }

  function checkAxisHitbox(click, axis, range) {
    return (click <= axis + range) && (click >= axis - range)
  }

  function getStationClicked(click) {
    let clickedStation
    for (let i = 0; i < stations.length; i++) {
      let { x, y } = stations[i]
      x *= dimension.w / 1770
      y *= dimension.h / 970
      if (checkAxisHitbox(click.x, x, 17) && checkAxisHitbox(click.y, y, 17)) {
        clickedStation = { id: i, ...stations[i] }
        break
      }
    }
    return clickedStation
  }


  function changePlayerPosition(playerId, newPosition) {
    const newPlayers = players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          position: newPosition
        }
      } else {
        return player
      }
    })
    socket.emit('player-change-position', room, newPlayers, currentVehicle)
  }

  function handleClick(event) {
    if (!canIPlay) {
      return false
    }
    const click = getMouseClick(event)
    const clickedStation = getStationClicked(click)
    const player = players.find(({ id }) => id === socket.id)
    if (!availableStations || !clickedStation) {
      return false
    }
    if (availableStations && availableStations.includes(clickedStation.id)) {
      changePlayerPosition(player.id, clickedStation.id)
      setCurrentVehicle()
      setAvailableStations([])
    }
  }

  function handleResize() {
    let w = window.innerWidth
    if (w > 1750) {
      w = 1750
    } else if (w < 1400) {
      w = 1400
    }

    const h = (w * 970) / 1770
    setDimension({ w, h })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Container>
      <ThiefHistoric />
      <canvas onClick={handleClick} ref={canvasRef} {...props} width={dimension.w} height={dimension.h} />
    </Container>
  )
}

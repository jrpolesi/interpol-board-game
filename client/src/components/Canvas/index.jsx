import React, { useRef, useEffect, useContext, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import backgroundCanvas from '../../assets/images/game-board.jpg'

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
  const { stations } = useContext(GameContext)
  const [canvasImage, setCanvasImage] = useState()
  const canvasRef = useRef(null)

  function drawBusStation(ctx, x, y) {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = '2'
    ctx.beginPath()
    ctx.arc((x - .15), (y - .15), 24, 0, 360)
    ctx.stroke()
  }

  function drawTaxiStation(ctx, x, y) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = '3'
    ctx.beginPath()
    ctx.arc(x, y, 21, 0, 360)
    ctx.stroke()
  }

  function drawNumberStation(ctx, x, y, stationId, fillColor) {
    ctx.roundRect((x - 23), (y - 12.5), 46, 25, 5)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = '1.5'
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke()
    ctx.font = '600 20px sans-serif'
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center'
    ctx.fillText(stationId, x, (y + 6.45))
  }

  function drawStation(ctx, station = {}, stationId) {
    const { x, y, subway, taxi, bus } = station
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(x, y, 19, 0, 360)
    ctx.fill()

 
    if (taxi) drawTaxiStation(ctx, x, y)

    if (bus) drawBusStation(ctx, x, y)

    const fillColorNumberStation = subway ? '#92d9ff' : '#FFFFFF'
    drawNumberStation(ctx, x, y, stationId, fillColorNumberStation)
  }
  function draw(ctx, frameCount) {
    if (canvasImage) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(canvasImage, 0, 0)
      for (let stationId in stations) {
        
      }
      stations.forEach((station, stationId) => {
        drawStation(ctx, station, stationId)
      })
      // Guia para o preenchimento manual das stations
      // ctx.beginPath()
      // ctx.arc(1372, 409, 21, 0, 360)
      // ctx.stroke()
    }
  }

  useEffect(() => {
    const image = new Image();
    image.src = backgroundCanvas
    image.onload = function () {
      setCanvasImage(image)
    }
  }, [])

  useEffect(() => {
    if (stations) {

    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    //Our draw came here
    function render() {
      frameCount++
      draw(context, frameCount)
    }
    render()

  }, [draw])

  function getMouseClick(event){
    const canvas = event.target
    const size = canvas.getBoundingClientRect()
    const x = (event.clientX - size.left)
    const y = (event.clientY - size.top)
    console.log(x, y)
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <canvas onClick={getMouseClick} ref={canvasRef} {...props} width={1770} height={960} />
    </div>
  )
}
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

  function drawBusStation(ctx, station) {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = '2'
    ctx.beginPath()
    ctx.arc(583.85, 204.85, 24, 0, 360)
    ctx.stroke()
  }

  function drawTaxiStation(ctx, station) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = '3'
    ctx.beginPath()
    ctx.arc(584, 205, 21, 0, 360)
    ctx.stroke()
  }

  function drawNumberStation(ctx, station, stationId) {
    ctx.roundRect((584 - 23), (205 - 12.5), 46, 25, 5)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = '1.5'
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke()
    ctx.font = '600 20px sans-serif'
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center'
    ctx.fillText('23',584, (205 + 6.45))
  }

  function drawStation(ctx, station, stationId) {
    // const {x, y} = station
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(584, 205, 19, 0, 360)
    ctx.fill()
    drawTaxiStation(ctx, station)
    drawBusStation(ctx, station)
    drawNumberStation(ctx)
  }
  function draw(ctx, frameCount) {
    if (canvasImage) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(canvasImage, 0, 0)
      for(let station in stations){
        console.log(station)
      }
      drawStation(ctx)
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
    function render(){
      frameCount++
      draw(context, frameCount)
    }
    render()

  }, [draw])

  return (
    <div style={{ overflow: 'auto' }}>
      <canvas ref={canvasRef} {...props} width={1760} height={960} />
    </div>
  )
}

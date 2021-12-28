import React from 'react'
import { Container } from './style'


export function CarAnimation() {
  return (
    <Container>
      <div className='car__siren'></div>
      <div className='car__headlight'></div>
      <div className='car__block'>
        <div className='car__ceil'>
          <div className='car__front'></div>
          <div className='car__middle'></div>
          <div className='car__back'></div>
          <div className='car__window'>
            <div className='car__window--back'></div>
            <div className='car__window--middle'></div>
            <div className='car__window--front'></div>
            <div className='car__window--division'></div>
          </div>
        </div>
        <div className='car__floor'>
          <div className='car__paint--lightFloor'></div>
          <div className='car__paint--darkFloor'></div>
        </div>
      </div>
      <div className='car__wheels'>
        <div className='car__wheel'></div>
        <div className='car__wheel'></div>
      </div>
    </Container>
  )
}
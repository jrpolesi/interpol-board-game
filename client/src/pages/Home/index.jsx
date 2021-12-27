import React from 'react'
import { CarAnimation } from '../../components/CarAnimation'
import { NewRoomModal } from '../../components/NewRoomModal'
import { Container } from './style'


export function Home() {
  return (
    <Container>
      <NewRoomModal />
      <CarAnimation />
    </Container>
  )
}
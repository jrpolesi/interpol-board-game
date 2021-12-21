import React from 'react'
import { ThiefButtons } from '../ThiefButtons'
import { TransportsButtons } from '../TransportsButtons'


export function GameControls() {
  return (
    <section>
      <TransportsButtons />
      <ThiefButtons />
    </section>
  )
}
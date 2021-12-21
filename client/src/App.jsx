import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { Home } from './pages/Home'

function App() {
  useEffect(() => {
    const socket = io('/')
    socket.on('connect', () => {
      console.log(socket)
    })
  }, [])
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

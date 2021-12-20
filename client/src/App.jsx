import React, { useEffect } from 'react'
import io from 'socket.io-client'

function App() {
  useEffect(() => {
    const socket = io('/')
    socket.on('connect', () => {
      console.log(socket)
    })
  }, [])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;

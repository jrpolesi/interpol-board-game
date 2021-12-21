import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConnectionProvider } from './ConnectionContext'
import { Home } from './pages/Home'
import { Game } from './pages/Game'

function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <Router>
          <Routes>
            <Route path="/rooms/:roomId" element={<Game />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Router>
      </ConnectionProvider>
    </div>
  );
}

export default App;

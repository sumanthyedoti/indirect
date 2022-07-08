import { FC } from 'react'
import { io } from 'socket.io-client'
import { Routes, Route } from 'react-router-dom'

import { Auth } from './views'

const socket = io('ws://localhost:4000')

const App: FC = () => {
  socket.on('connect', () => {
    console.log('socket connected - ' + socket.id)
  })
  socket.on('disconnect', () => {
    console.log('socket disconnected - ' + socket.id)
  })
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  )
}

export default App

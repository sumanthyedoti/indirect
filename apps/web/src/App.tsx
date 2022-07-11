import { useState, useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, Register, Space } from './views'
import { useSocket } from './hooks'

const App: FC = () => {
  const [id, setId] = useState('')
  const socket = useSocket()
  useEffect(() => {
    socket.on('connect', () => {
      setId(socket.id)
      console.log(socket.id)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>id:{id}</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/space" element={<Space />} />
      </Routes>
    </>
  )
}

export default App

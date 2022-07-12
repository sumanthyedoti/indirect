import { useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, Register, Space } from './views'
import { useSocket } from './hooks'

const App: FC = () => {
  const socket = useSocket()
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Space />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

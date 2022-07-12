import { useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, Register, Space } from './views'
import { useSocket } from './hooks'
import userStore from './store/userStore'

const App: FC = () => {
  const socket = useSocket()
  const { isLoggedIn } = userStore()
  useEffect(() => {
    if (isLoggedIn) socket.connect()
  }, [isLoggedIn])
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

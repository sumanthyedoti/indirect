import { useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Login, Register, Space } from './views'
import { useSocket } from './hooks'
import userStore from './store/userStore'
import { PrivateRoute } from './routes'

const App: FC = () => {
  const socket = useSocket()
  const { isLoggedIn } = userStore()
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })
  }, [])
  useEffect(() => {
    if (isLoggedIn) socket.connect()
  }, [isLoggedIn])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Space />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

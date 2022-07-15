import { useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, Register, Space } from './views'
import { Logout } from './icons'
import { useSocket } from './hooks'
import userStore from './store/userStore'
import { PrivateRoute } from './routes'

const App: FC = () => {
  const socket = useSocket()
  const { isLoggedIn, logout } = userStore()
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
      {isLoggedIn && (
        <button
          onClick={logout}
          className="absolute top-4 right-6"
          aria-label="Log out"
        >
          <Logout />
        </button>
      )}
    </>
  )
}

export default App

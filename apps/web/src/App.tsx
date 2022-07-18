import { useEffect, FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register, Space } from './views'
import { Logout } from './icons'
import { useSocket } from './hooks'
import userStore from './store/userStore'
import { PrivateRoute } from './routes'
import api from './axios'
import { userErrorToastOptions } from './utils'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

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

  const handleLogout = async () => {
    try {
      await api.delete('/logout')
      logout()
    } catch (err) {
      toast.error('Failed to logout. Please try again', userErrorToastOptions)
    }
  }

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
          onClick={handleLogout}
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

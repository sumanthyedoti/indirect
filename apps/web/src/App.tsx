import { useEffect, FC } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register, Space } from './views'
import { useSocket } from './hooks'
import userStore from './store/userStore'
import { PrivateRoute } from './routes'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const App: FC = () => {
  const socket = useSocket()
  const { isLoggedIn } = userStore()
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })

    return () => {
      socket.off('connect')
    }
  }, [])
  useEffect(() => {
    if (isLoggedIn) socket.connect()
    navigate('/space')

    return () => {
      socket.disconnect()
    }
  }, [isLoggedIn])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/space" element={<Space />}>
            <Route path=":channelId" element={<Space />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

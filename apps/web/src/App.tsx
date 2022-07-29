import { useEffect, FC } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register } from './views'
import Main from './components/Main'
import { useSocket } from './hooks'
import useUserStore from './store/useUserStore'
import { PrivateRoute } from './routes'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const App: FC = () => {
  const socket = useSocket()
  const { isLoggedIn } = useUserStore()
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
          <Route path="/space" element={<Main />}>
            <Route path=":channelId" element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

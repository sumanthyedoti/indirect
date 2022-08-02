import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register, Spaces } from './views'
import Main from './components/Main'
import { PrivateRoute } from './routes'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/space" element={<Spaces />}>
            <Route path=":channelId" element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

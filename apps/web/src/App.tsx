import { FC, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register } from './views'
import { CenterLoader } from './components/molecules'
import { PrivateRoute, NoMatch } from './routes'

const Main = lazy(() => import('./views/Main'))
const Channel = lazy(() => import('./components/Channel'))
const Spaces = lazy(() => import('./views/Spaces'))
const JoinSpace = lazy(() => import('./views/JoinSpace'))

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
          <Route
            path="/"
            element={
              <Suspense fallback={<CenterLoader />}>
                <Spaces />
              </Suspense>
            }
          />
          <Route
            path=":spaceId/join"
            element={
              <Suspense fallback={<CenterLoader />}>
                <JoinSpace />
              </Suspense>
            }
          />
          <Route
            path=":spaceId"
            element={
              <Suspense fallback={<CenterLoader />}>
                <Main />
              </Suspense>
            }
          >
            <Route
              path=":channelId"
              element={
                <Suspense fallback={<CenterLoader />}>
                  <Channel />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App

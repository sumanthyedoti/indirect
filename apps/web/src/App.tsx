import { FC, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Login, Register, Main, JoinSpace } from './views'
import { PrivateRoute, NoMatch } from './routes'
import { Loader } from './icons'

const Channel = lazy(() => import('./components/Channel'))
const Spaces = lazy(() => import('./views/Spaces'))

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
              <Suspense fallback="Loading">
                <Spaces />
              </Suspense>
            }
          />
          <Route
            path=":spaceId/join"
            element={
              <Suspense fallback="Loading">
                <JoinSpace />
              </Suspense>
            }
          />
          <Route
            path=":spaceId"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                  </div>
                }
              >
                <Main />
              </Suspense>
            }
          >
            <Route
              path=":channelId"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center w-full h-full">
                      <Loader />
                    </div>
                  }
                >
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

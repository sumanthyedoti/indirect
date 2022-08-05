import { useEffect, FC } from 'react'
import {
  Navigate,
  Outlet,
  // useNavigate
} from 'react-router-dom'

import useUserStore from '../store/useUserStore'
import { useSocket } from '../hooks'

const PrivateRoute: FC = () => {
  const socket = useSocket()
  const { isLoggedIn } = useUserStore()
  // const navigate = useNavigate()
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })

    if (isLoggedIn) {
      socket.connect()
    }
    // navigate('/')

    return () => {
      socket.off('connect')
      socket.disconnect()
    }
  }, [isLoggedIn])
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute

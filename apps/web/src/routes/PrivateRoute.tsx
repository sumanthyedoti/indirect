import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useUserStore from '../store/useUserStore'

const PrivateRoute: FC = () => {
  const { isLoggedIn } = useUserStore()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute

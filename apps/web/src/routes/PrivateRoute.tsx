import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import userStore from '../store/userStore'

const PrivateRoute: FC = () => {
  const { isLoggedIn } = userStore()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute

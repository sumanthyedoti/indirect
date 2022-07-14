import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import userStore from '../store/userStore'
// import { doesHttpOnlyCookieExist } from '../utils'

const PrivateRoute: FC = () => {
  const { isLoggedIn } = userStore()
  // const cookieExists = doesHttpOnlyCookieExist('sid')

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute

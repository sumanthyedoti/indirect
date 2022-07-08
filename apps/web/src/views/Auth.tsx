import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Atoms } from '@libs/components'

const AuthView: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-teal-300">
      <h1>hello</h1>
      <Atoms.Button label="Click" />
      <Outlet />
    </div>
  )
}

export default AuthView

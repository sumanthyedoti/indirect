import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Atoms, Molecules } from '@libs/components'

const AuthView: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-400">
      <h1>Login</h1>
      <form className="flex flex-col items-center">
        <Molecules.LabelledInput
          label="Email"
          field={<Atoms.Input type="text" />}
        />
        <Molecules.LabelledInput
          label="Password"
          field={<Atoms.Input type="password" />}
        />
        <Atoms.Button type="submit" label="Login" />
      </form>

      <Outlet />
    </div>
  )
}

export default AuthView

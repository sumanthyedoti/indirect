import { FC } from 'react'

import { Atoms, Molecules } from '@libs/components'

const Register: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Atoms.AuthForm>
        <h1>Register</h1>
        <Molecules.FormInput
          label="Full Name"
          field={<Atoms.Input type="text" />}
        />
        <Molecules.FormInput
          label="Email"
          field={<Atoms.Input type="email" />}
        />
        <Molecules.FormInput
          label="Password"
          field={<Atoms.Input type="password" />}
        />
        <Molecules.FormInput
          label="Confirm Password"
          field={<Atoms.Input type="password" />}
        />
        <Atoms.Button type="submit" label="Register" />
      </Atoms.AuthForm>
    </div>
  )
}

export default Register

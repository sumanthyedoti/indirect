import { FC } from 'react'

import { AuthForm, Input, Button } from '../components/atoms'
import { FormInput } from '../components/molecules'

const Register: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthForm>
        <h1>Register</h1>
        <FormInput label="Full Name" field={<Input type="text" />} />
        <FormInput label="Email" field={<Input type="email" />} />
        <FormInput label="Password" field={<Input type="password" />} />
        <FormInput label="Confirm Password" field={<Input type="password" />} />
        <Button type="submit" label="Register" />
      </AuthForm>
    </div>
  )
}

export default Register

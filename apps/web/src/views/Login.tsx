import { useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthForm, Input, Button } from '../components/atoms'
import { FormInput } from '../components/molecules'
import userStore from '../store/userStore'
import api from '../axios'

const schema = yup.object().shape({
  email: yup.string().email('Invalid Emial!').required('Email required!'),
  password: yup
    .string()
    .required('Password required!')
    .min(6, 'Password should be atleast 6 characters!'),
})
interface FormInputs {
  email: string
  password: string
}

const Login: FC = () => {
  const navigate = useNavigate()
  const login = userStore((store) => store.login)
  const { isLoggedIn } = userStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])
  const onSubmit = async (input: FormInputs) => {
    const { data } = await api.post('/login', input)
    login(data)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8">Login</h1>
        <FormInput
          label="Email"
          field={<Input {...register('email')} type="email" />}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          field={<Input {...register('password')} type="password" />}
          error={errors.password?.message}
        />
        <Button type="submit" label="Login" />
      </AuthForm>
    </div>
  )
}

export default Login

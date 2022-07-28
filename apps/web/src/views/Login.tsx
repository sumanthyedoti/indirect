import { useEffect, FC } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginUser } from '@api-types/users'
import { Constraints } from '@api-types/users'
import { AuthForm, Input, Button } from '../components/atoms'
import { FormInput } from '../components/molecules'
import userStore from '../store/userStore'
import api from '../axios'
import {
  userErrorToastOptions,
  appErrorToastOptions,
} from '../config/toastConfig'
import { useToastLimit } from '../hooks'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid Email')
    .required('Email required!')
    .min(Constraints.emailMin, `Invalid email`)
    .max(
      Constraints.emailMax,
      `We don't support emails that max ${Constraints.emailMax}`
    ),
  password: yup
    .string()
    .required('Password required')
    .min(
      Constraints.passwordMin,
      `Password should be atleast ${Constraints.passwordMin} characters`
    )
    .max(
      Constraints.passwordMax,
      `We don't support password that max ${Constraints.passwordMax}`
    ),
})

const Login: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useToastLimit()
  const locationState = location.state as { isRegister: boolean }

  const { isLoggedIn, login, setSpaceId, setChannelId } = userStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])
  const onSubmit = async (input: LoginUser) => {
    try {
      const { data } = await api.post('/login', input)
      login(data)
      setSpaceId(1) // TODO: handle dyamically
      setChannelId(1) // TODO: handle dyamically
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) {
        toast.error('Email/password invalid!', userErrorToastOptions)
      } else {
        toast.error(
          'Something went wrong. Please try again',
          appErrorToastOptions
        )
      }
    }
  }

  // TODO welocme message function utility
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthForm autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <h1>{locationState?.isRegister ? 'Welcome!' : 'Welcome back!'}</h1>
        <FormInput
          label="Email"
          id="email"
          field={<Input {...register('email')} type="email" />}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          id="password"
          field={
            <Input
              autoComplete="on"
              {...register('password')}
              type="password"
            />
          }
          error={errors.password?.message}
        />
        <Button className="w-full mt-5" type="submit" label="Login" />
      </AuthForm>
      <p>
        Need an account?&nbsp;&nbsp;
        <Link
          to="/register"
          className="outline-none focus:ring ring-blue-300 ring-offset ring-offset-slate-700"
        >
          <b className="font-medium">Register</b>
        </Link>
      </p>
    </div>
  )
}

export default Login

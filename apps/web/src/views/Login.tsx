import { useEffect, FC } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthForm, Input, Button } from '../components/atoms'
import { FormInput } from '../components/molecules'
import userStore from '../store/userStore'
import api from '../axios'

const schema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email required!'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password should be atleast 6 characters'),
})
interface FormInputs {
  email: string
  password: string
}

const Login: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { isRegister: boolean }

  const login = userStore((store) => store.login)
  const { isLoggedIn, isSessionExpired } = userStore()

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
    try {
      const { data } = await api.post('/login', input)
      login(data)
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) {
        toast.error('Email/password invlid!')
      } else {
        toast.error('Something went wrong. Please try again')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        {isSessionExpired ? (
          <h1>Please log in again</h1>
        ) : (
          <h1>{locationState?.isRegister ? 'Welcome!' : 'Welcome back!'}</h1>
        )}
        <FormInput
          label="Email"
          id="email"
          field={<Input {...register('email')} type="email" />}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          id="password"
          field={<Input {...register('password')} type="password" />}
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

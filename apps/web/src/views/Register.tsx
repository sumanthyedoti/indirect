import { useEffect, useState, FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { RegisterUser } from '@api-types/users'
import { Constraints } from '@api-types/users'
import { AuthForm, Input, Button } from '../components/atoms'
import { FormInput, Header } from '../components/molecules'
import useUserStore from '../store/useUserStore'
import api from '../axios'
import { useToastLimit } from '../hooks'

const schema = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required('Please enter your name')
    .max(Constraints.fullname, `Please keep it under ${Constraints.fullname}`),
  email: yup
    .string()
    .trim()
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
interface FormInputs extends RegisterUser {
  confirmPassword: string
}

const Register: FC = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })
  useToastLimit()
  const navigate = useNavigate()
  const { isLoggedIn } = useUserStore()
  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  const onSubmit = async (input: FormInputs) => {
    try {
      setIsProcessing(true)
      await api.post('/register', input)
      navigate('/login', { state: { isRegister: true } })
    } catch (error) {
      setIsProcessing(false)
      const err = error as AxiosError
      if (err.response?.status === 409) {
        toast.error('Email already exists!')
      } else {
        toast.error('Something when wrong')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
      <Header />
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <h1>Create an account</h1>
        <FormInput
          label="Full Name"
          id="fullname"
          field={<Input {...register('fullname')} type="text" />}
          error={errors.fullname?.message}
        />
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
              autoComplete="off"
              {...register('password')}
              type="password"
            />
          }
          error={errors.password?.message}
        />
        <FormInput
          label="Confirm Password"
          id="confirm-password"
          field={
            <Input
              autoComplete="off"
              {...register('confirmPassword')}
              type="password"
            />
          }
          error={errors.confirmPassword?.message}
        />
        <Button
          isLoading={isProcessing}
          disabled={isProcessing}
          className="w-full mt-5"
          type="submit"
        >
          Register
        </Button>
        <p className="mt-4">
          Already have an account?&nbsp;&nbsp;
          <Link
            to="/login"
            className="outline-none focus:ring ring-blue-300 ring-offset ring-offset-slate-700"
          >
            <b className="font-medium">Log in</b>
          </Link>
        </p>
      </AuthForm>
    </div>
  )
}

export default Register

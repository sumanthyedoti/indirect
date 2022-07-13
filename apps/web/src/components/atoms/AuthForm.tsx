import React, { FC } from 'react'

interface AuthFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const AuthForm: FC<AuthFormProps> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col items-center
                px-20 py-10 rounded`}
    >
      {children}
    </form>
  )
}

export default AuthForm

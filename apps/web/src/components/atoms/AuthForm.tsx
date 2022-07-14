import React, { FC } from 'react'

interface AuthFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const AuthForm: FC<AuthFormProps> = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`md:w-2/3 lg:w-2/5 xl:w-1/3 flex flex-col items-center
                p-10 rounded`}
    >
      {children}
    </form>
  )
}

export default AuthForm

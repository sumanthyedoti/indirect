import { FC } from 'react'

interface Props {
  children: string | undefined
}

const FormFieldError: FC<Props> = ({ children }) => {
  return <em className="text-sm text-red-500">{children}</em>
}

export default FormFieldError

import { FC, forwardRef } from 'react'
import classnames from 'classnames'

export type InputType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'reset'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

interface Props {
  type: InputType
  id?: string
  placeholder?: string
  className?: string
}

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ type, id, placeholder, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classnames([
          `px-4 py-3 mb-1
          outline-none w-72 md:w-96 bg-gray-800
          rounded-md focus:ring ring-sky-500`,
          className,
        ])}
        placeholder={placeholder}
        id={id}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
export default Input

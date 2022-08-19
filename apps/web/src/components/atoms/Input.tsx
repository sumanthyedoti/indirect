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
  autoComplete?: 'on' | 'off'
  placeholder?: string
  className?: string
  onChange?: any
}

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classnames([
          `px-4 py-2.5 mb-1
          outline-none bg-gray-700
          ring-offset-transparent
          rounded-md focus:ring ring-sky-500`,
          className,
        ])}
        onChange={onChange}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
export default Input

import { FC } from 'react'
import classnames from 'classnames'

import { Loader } from '../../icons'
interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  isLoading?: boolean
  small?: boolean
  primary?: boolean
  secondary?: boolean
  danger?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<props> = ({
  label,
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  small,
  primary,
  secondary,
  danger,
  className,
  ...props
}) => {
  const classes = classnames(
    `text-zinc-100
    ring-slate-100 ring-offset-1 focus:ring-2
    ring-offset-transparent
    flex justify-center items-center space-x-3
    outline-none rounded`,
    {
      'px-6 py-3 text-lg font-semibold': !small,
      'px-4 py-2 text-md font-medium': small,
      'bg-gray-600': secondary,
      'bg-red-500': danger,
      'cursor-not-allowed': disabled,
      'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700':
        primary || (!secondary && !danger),
    }
  )
  return (
    <button
      type={type}
      disabled={disabled}
      className={classnames([classes, className])}
      onClick={onClick}
      {...props}
    >
      <span>{label}</span>
      {isLoading && <Loader width="16px" height="16px" />}
    </button>
  )
}

export default Button

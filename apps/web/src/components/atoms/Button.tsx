import { FC } from 'react'
import classnames from 'classnames'

interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
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
    outline-none rounded`,
    {
      'px-6 py-3 text-lg font-semibold': !small,
      'px-4 py-2 text-md font-medium': small,
      'bg-gray-600': secondary,
      'bg-red-500': danger,
      'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700':
        primary || (!secondary && !danger),
    }
  )
  return (
    <button
      {...props}
      type={type}
      className={classnames([classes, className])}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button

import { FC } from 'react'
import classnames from 'classnames'

interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  primary?: boolean
  secondary?: boolean
  danger?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<props> = ({
  label,
  type = 'button',
  onClick,
  primary,
  secondary,
  danger,
  className,
  ...props
}) => {
  const classes = classnames(
    `px-6 py-3 text-zinc-100 text-lg
    ring-slate-100 ring-offset-1 focus:ring-2
    ring-offset-transparent
    outline-none font-semibold rounded`,
    {
      'bg-gray-600': secondary,
      'bg-red-500': danger,
      'bg-blue-600': primary || (!secondary && !danger),
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

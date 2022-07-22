import { FC } from 'react'
import classnames from 'classnames'

interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  primary?: boolean
  secondary?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<props> = ({
  label,
  type = 'button',
  onClick,
  primary,
  secondary,
  className,
  ...props
}) => {
  const classes = classnames(
    `px-6 py-3 text-zinc-100 text-lg
    ring-slate-100 ring-offset-1 focus:ring-2
    outline-none font-semibold rounded`,
    [(primary || !secondary) && `bg-blue-600`, secondary && `bg-gray-600`]
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

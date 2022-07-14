import { FC } from 'react'
import classnames from 'classnames'

interface props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<props> = ({
  label,
  type = 'button',
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={classnames([
        `px-6 py-3 text-zinc-100 text-lg
            bg-blue-600 rounded
            outline-none font-semibold
            ring-slate-100 ring-offset-1 focus:ring-2`,
        className,
      ])}
      onClick={onClick}
    >
      {label}!
    </button>
  )
}

export default Button

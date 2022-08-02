import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

interface props {
  children: React.ReactNode
  className?: string
  small?: boolean
  to: string
}

const Button: FC<props> = ({ children, to, small, className, ...props }) => {
  const classes = classnames(
    `text-zinc-100 hover:no-underline
    ring-slate-100 ring-offset-1 focus:ring-2
    ring-offset-transparent
    outline-none rounded bg-blue-600 hover:bg-blue-700 focus:bg-blue-700`,
    {
      'px-6 py-3 text-lg font-semibold': !small,
      'px-4 py-2 text-md font-medium': small,
    }
  )
  return (
    <Link to={to} {...props} className={classnames([classes, className])}>
      {children}
    </Link>
  )
}

export default Button

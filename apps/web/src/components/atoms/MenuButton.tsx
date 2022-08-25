import React, { FC } from 'react'
import classnames from 'classnames'

import { Loader } from '../../icons'

interface MenuButtonProps {
  children: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
  danger?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const MenuButton: FC<MenuButtonProps> = ({
  disabled,
  isLoading,
  className,
  children,
  danger,
  onClick,
}) => {
  const classes = classnames(
    `
      flex items-center px-4 py-2 space-x-3`,
    {
      'hover:bg-slate-800': !danger,
      'text-red-500 hover:bg-red-500 hover:text-current': danger,
      'cursor-not-allowed': disabled,
    }
  )
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classnames([classes, className])}
    >
      {children}
      {isLoading && <Loader width="14px" height="14px" />}
    </button>
  )
}

export default MenuButton

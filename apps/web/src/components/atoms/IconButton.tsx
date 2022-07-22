import React, { FC } from 'react'
import classnames from 'classnames'

interface IconButtonProps {
  children: React.ReactElement
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const IconButton: FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={classnames(
        `rounded-sm
        outline-none
        ring-sky-500 ring-offset-1 ring-offset-transparent focus:ring-1`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton

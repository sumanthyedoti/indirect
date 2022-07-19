import React from 'react'

interface Props {
  children: React.ReactNode
}

const MessagesContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return (
      <article
        ref={ref}
        className={`h-full pb-2 overflow-y-auto
        flex flex-col
      `}
      >
        {children}
      </article>
    )
  }
)
MessagesContainer.displayName = 'MessagesContainer'
export default MessagesContainer

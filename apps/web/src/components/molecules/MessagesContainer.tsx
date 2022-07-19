import React, { useRef, useEffect, FC } from 'react'

interface Props {
  children: React.ReactNode
}

const MessagesContainer: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  return (
    <article
      ref={containerRef}
      className={`
      h-full pb-2 overflow-y-auto
      `}
    >
      {children}
    </article>
  )
}

export default MessagesContainer

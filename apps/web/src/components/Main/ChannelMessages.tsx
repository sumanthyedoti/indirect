import { useRef, FC } from 'react'

import * as T from '@api-types/messages'
import { MessagesOfADay } from '../organisms'

interface ChannelMessagesProps {
  messages: T.Message[]
}

const ChannelMessages: FC<ChannelMessagesProps> = ({ messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  let messagesOfADay: T.Message[] = []
  let isFirstDay = true

  return (
    <article
      ref={messagesContainerRef}
      className={`h-full mr-2 overflow-y-auto
        flex flex-col main-view-padding
      `}
    >
      {messages.map((m, i) => {
        const currentDate = new Date(m.created_at).getDate()
        const nextDate = new Date(messages[i + 1]?.created_at).getDate()
        if (currentDate !== nextDate) {
          messagesOfADay.push(m)
          const Messages = (
            <MessagesOfADay
              key={m.created_at.toString()}
              containerRef={messagesContainerRef}
              isFirstDay={isFirstDay}
              messages={messagesOfADay}
            />
          )
          isFirstDay = false
          messagesOfADay = []
          return Messages
        } else {
          messagesOfADay.push(m)
          return null
        }
      })}
    </article>
  )
}

export default ChannelMessages

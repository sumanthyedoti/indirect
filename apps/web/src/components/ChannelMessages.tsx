import { useRef, FC } from 'react'

import T from '../types.d'
import { MessagesOfADay } from './organisms'
import { MessagesContainer } from './molecules'

interface ChannelMessagesProps {
  messages: T.Message[]
}

const ChannelMessages: FC<ChannelMessagesProps> = ({ messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  let messagesOfADay: T.Message[] = []
  let isFirstDay = true

  return (
    <MessagesContainer ref={messagesContainerRef}>
      {messages.map((m, i) => {
        const currentDate = new Date(m.created_at).getDate()
        const nextDate = new Date(messages[i + 1]?.created_at).getDate()
        if (currentDate !== nextDate) {
          messagesOfADay.push(m)
          const Messages = (
            <MessagesOfADay
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
    </MessagesContainer>
  )
}

export default ChannelMessages

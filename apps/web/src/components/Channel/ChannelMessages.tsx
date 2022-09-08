import { useRef, FC } from 'react'

import * as T from '@api-types/messages'
import MessagesOfADay from './MessagesOfADay'
import MessagesLoader from './MessagesLoader'
import useUserStore from '../../store/useUserStore'
import { useQueryChannelMessages } from '../../queries'

const ChannelMessages: FC = () => {
  const { channelId } = useUserStore()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { data: messages } = useQueryChannelMessages(channelId)

  let messagesOfADay: T.Message[] = []
  let isFirstDay = true

  if (!messages) return <MessagesLoader />

  return (
    <div
      ref={messagesContainerRef}
      className={`h-full overflow-y-auto
        flex flex-col main-view-padding
      `}
    >
      {messages?.map((m, i) => {
        const currentDate = new Date(m.created_at).getDate()
        const nextDate = new Date(messages[i + 1]?.created_at).getDate()
        if (currentDate !== nextDate) {
          messagesOfADay.push(m)
          const Messages = (
            <MessagesOfADay
              key={m.id.toString()}
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
    </div>
  )
}

export default ChannelMessages

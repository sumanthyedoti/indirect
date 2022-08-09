import { useRef, FC } from 'react'

import * as T from '@api-types/messages'
import MessagesOfADay from './MessagesOfADay'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQueryChannelMessages } from '../../queries'

const ChannelMessages: FC = () => {
  const { channelId } = useUserStore()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { data: messages } = useQueryChannelMessages(channelId)

  // const socket = useSocket()
  // useEffect(() => {
  //   socket.on('message_received', (msg: T.Message) => {
  //     if (msg.channel_id !== channelId) return
  //     setMessages((messages) => [...messages, msg])
  //   })
  //   return () => {
  //     socket.off('message_received')
  //     toast.dismiss()
  //   }
  // }, [])

  let messagesOfADay: T.Message[] = []
  let isFirstDay = true

  return (
    <article
      ref={messagesContainerRef}
      className={`h-full mr-2 overflow-y-auto
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

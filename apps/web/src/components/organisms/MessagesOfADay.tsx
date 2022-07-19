import { useEffect, FC, RefObject } from 'react'

import T from '../../types.d'
import userStore from '../../store/userStore'
import { MessageDate } from '../atoms'
import { Message } from '../molecules'
import { useQueryUsers } from '../../queries'

interface MessagedOfADayProps {
  isFirstDay: boolean
  containerRef: RefObject<HTMLDivElement>
  messages: T.Message[]
}

const MessagedOfADay: FC<MessagedOfADayProps> = ({
  messages,
  isFirstDay,
  containerRef,
}) => {
  const { user } = userStore()
  const { data: users, isSuccess } = useQueryUsers()

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  if (!isSuccess) return null
  return (
    <div className={isFirstDay ? 'mt-auto' : ''}>
      <section className="relative pb-2 mt-3 border-t border-gray-500">
        <MessageDate timestamp={messages[0].created_at} />
        {messages.map((m) => {
          return (
            <Message
              key={m.id}
              createdAt={m.created_at}
              senderName={user && users[m.sender_id]?.fullname}
              message={m}
            />
          )
        })}
      </section>
    </div>
  )
}

export default MessagedOfADay

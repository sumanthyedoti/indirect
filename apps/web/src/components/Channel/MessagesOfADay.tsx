import { useEffect, FC, RefObject, memo } from 'react'

import * as T from '@api-types/messages'
import useUserStore from '../../store/useUserStore'
import { MessageDate } from '../atoms'
import { Message } from '../molecules'
import { useQuerySpaceUsers } from '../../queries'

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
  const { user, spaceId } = useUserStore()
  const { data: users, isSuccess } = useQuerySpaceUsers(spaceId)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })

  if (!user) return null
  if (!isSuccess) return null //loading

  return (
    <div className={isFirstDay ? 'mt-auto' : ''}>
      <section className="relative pb-2 mt-3 border-t border-gray-500">
        <MessageDate timestamp={messages[0].created_at} />
        {messages.map((m) => {
          return (
            <Message
              key={m.id}
              createdAt={m.created_at}
              senderName={
                users.idMap[m.sender_id]?.display_name ||
                users.idMap[m.sender_id]?.fullname
              }
              message={m}
            />
          )
        })}
      </section>
    </div>
  )
}

export default memo(MessagedOfADay)

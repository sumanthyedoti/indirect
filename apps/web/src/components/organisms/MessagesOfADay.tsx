import { FC } from 'react'

import T from '../../types.d'
import userStore from '../../store/userStore'
import { MessageDate } from '../atoms'
import { Message } from '../molecules'
import { useQueryUsers } from '../../queries'

interface MessagedOfADayProps {
  // isFirstDay: boolean
  messages: T.Message[]
}

const MessagedOfADay: FC<MessagedOfADayProps> = ({ messages }) => {
  const { user } = userStore()
  const { data: users, isSuccess } = useQueryUsers()

  if (!isSuccess) return null
  return (
    <div>
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
    </div>
  )
}

export default MessagedOfADay

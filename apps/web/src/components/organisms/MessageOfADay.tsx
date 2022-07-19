import { FC } from 'react'

import { Message } from '../../types.d'
import { MessageDate } from '../atoms'

interface MessagedOfADayProps {
  timestamp: Date
  messages: Message[]
}

export const MessagedOfADay: FC<MessagedOfADayProps> = ({
  messages,
  timestamp,
}) => {
  console.log(messages)

  return (
    <>
      <MessageDate timestamp={timestamp} />
    </>
  )
}

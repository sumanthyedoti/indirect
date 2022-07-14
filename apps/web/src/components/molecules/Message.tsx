import { FC } from 'react'
import T from '../../types.d'

interface MessageProps {
  senderName: string | null
  message: T.Message
}

const Message: FC<MessageProps> = ({ senderName, message }) => {
  return (
    <div className="flex flex-col my-3">
      <b className="text-sm">{senderName}</b>
      <p className="leading-5">{message.text}</p>
    </div>
  )
}

export default Message

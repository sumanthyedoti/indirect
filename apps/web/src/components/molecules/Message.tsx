import { FC } from 'react'
import classnames from 'classnames'
import T from '../../types.d'

interface MessageProps {
  senderName: string | null
  message: T.Message
}

const Message: FC<MessageProps> = ({ senderName, message }) => {
  const senderClassNames = classnames('text-sm', {
    'text-neutral-400': !senderName,
  })
  return (
    <div className="flex flex-col my-3">
      <b className={senderClassNames}>{senderName || 'Unknow User'}</b>
      <p className="leading-5">{message.text}</p>
    </div>
  )
}

export default Message

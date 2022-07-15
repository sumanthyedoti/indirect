import { FC } from 'react'
import dayjs from 'dayjs'
import classnames from 'classnames'

import T from '../../types.d'

interface MessageProps {
  senderName: string | null
  createdAt: Date
  message: T.Message
}

const Message: FC<MessageProps> = ({ senderName, message, createdAt }) => {
  const senderClassNames = classnames('text-sm font-medium', {
    'text-sky-400': senderName,
    'text-neutral-400': !senderName,
  })
  const getDate = () => {
    const datetime = dayjs(createdAt)
    const time = datetime.format('HH:MM')
    if (datetime.isYesterday()) return 'Yesterday, ' + time
    if (datetime.isToday()) return 'Today, ' + time
    return datetime.format('DD/MM/YY, HH:MM')
  }
  return (
    <div className="flex flex-col my-3">
      <p>
        <b className={senderClassNames}>{senderName || 'Unknow User'}</b>
        <span className="pl-2 text-xs font-light text-neutral-400">
          {getDate()}
        </span>
      </p>
      <p className="leading-5">{message.text}</p>
    </div>
  )
}

export default Message

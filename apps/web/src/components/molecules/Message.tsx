import { FC } from 'react'
import dayjs from 'dayjs'
import classnames from 'classnames'

import * as T from '@api-types/messages'

interface MessageProps {
  senderName: string | null
  createdAt: Date
  message: T.Message
  className?: string | null
}

const Message: FC<MessageProps> = ({
  senderName,
  message,
  createdAt,
  className,
}) => {
  const senderClassNames = classnames('text-sm font-medium', {
    'text-sky-300': senderName,
    'text-stone-400': !senderName,
  })
  const time = dayjs(createdAt)
  return (
    <section className={classnames('flex flex-col my-3', className)}>
      <p>
        <b className={senderClassNames}>{senderName || 'Unknow User'}</b>
        <time
          dateTime={time.format('HH:mm')}
          className="pl-2 text-xs font-light text-neutral-400"
        >
          {time.format('hh:mm a')}
        </time>
      </p>
      <p className="leading-5">{message.text}</p>
    </section>
  )
}

export default Message

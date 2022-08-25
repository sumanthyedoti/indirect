import { FC } from 'react'
import dayjs from 'dayjs'
import classnames from 'classnames'

import * as T from '@api-types/messages'

interface MessageProps {
  isProfileActive: boolean
  senderName: string
  createdAt: Date
  message: T.Message
  className?: string | null
}

const Message: FC<MessageProps> = ({
  senderName,
  message,
  createdAt,
  className,
  isProfileActive,
}) => {
  const senderClassNames = classnames('text-sm font-medium', {
    'text-sky-300': senderName,
    'text-stone-400': !isProfileActive,
  })
  const time = dayjs(createdAt)

  return (
    <section className={classnames('message flex flex-col my-3', className)}>
      <p>
        <b className={senderClassNames}>{senderName || 'Unknow User'}</b>
        <time
          dateTime={time.format('HH:mm')}
          className="pl-2 text-xs font-light text-neutral-400"
        >
          {time.format('hh:mm a')}
        </time>
      </p>
      <div
        className="leading-5"
        dangerouslySetInnerHTML={{ __html: message.html || '' }}
      />
    </section>
  )
}

export default Message

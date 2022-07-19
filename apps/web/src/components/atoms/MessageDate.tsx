import { FC } from 'react'
import dayjs from 'dayjs'

interface MessageDayProps {
  timestamp: Date
}

const MessageDay: FC<MessageDayProps> = ({ timestamp }) => {
  const date = dayjs(timestamp)
  return (
    <div className="relative message-date">
      <time
        className={`px-3 py-0.5 bg-slate-800 mx-auto block w-fit
          text-xs text-gray-400
          relative z-10`}
        dateTime={date.format('YYYY-MM-DD')}
      >
        {date.isToday()
          ? 'Today'
          : date.isYesterday()
          ? 'Yesterday'
          : date.format('ddd, MMM D')}
      </time>
    </div>
  )
}

export default MessageDay

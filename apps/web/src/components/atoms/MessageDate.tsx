import { FC } from 'react'
import dayjs from 'dayjs'

interface MessageDayProps {
  timestamp: Date
}

const MessageDay: FC<MessageDayProps> = ({ timestamp }) => {
  const date = dayjs(timestamp)
  return (
    <time
      className={`messages-date px-3 py-0.5 bg-slate-800 mx-auto block w-fit
          text-xs text-gray-400
          border border-gray-500 rounded-full
          shadow shadow-gray-600`}
      dateTime={date.format('YYYY-MM-DD')}
    >
      {date.isToday()
        ? 'Today'
        : date.isYesterday()
        ? 'Yesterday'
        : date.format('ddd, MMM D')}
    </time>
  )
}

export default MessageDay

import { useRef, FC, useEffect, memo } from 'react'

import * as T from '@api-types/messages'
import MessageDate from '../atoms/MessageDate'
import Message from '../molecules/Message'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQuerySpaceUsers } from '../../queries'

interface MessageRowProps {
  index: number
  message: T.Message
  previousMessageDate: Date | null
  style: Record<string, any>
  setRowHeight: (index: number, size: number) => void
}
const MessageRow: FC<MessageRowProps> = memo(
  ({ index: i, message, previousMessageDate, style, setRowHeight }: any) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const { spaceId } = useUserStore()
    const { data: users } = useQuerySpaceUsers(spaceId)
    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(i, rowRef.current.clientHeight)
      }
      // eslint-disable-next-line
    }, [rowRef])
    const prevDate =
      previousMessageDate && new Date(previousMessageDate).getDate()
    const currentDate = new Date(message?.created_at).getDate()

    if (!users) return null
    return (
      <div ref={rowRef} style={style}>
        {currentDate !== prevDate && (
          <div className="pb-0 mt-3 border-t border-gray-500">
            <MessageDate timestamp={message.created_at} />
          </div>
        )}
        <Message
          key={message.id}
          createdAt={message.created_at}
          senderName={
            users.idMap[message.sender_id]?.display_name ||
            users.idMap[message.sender_id]?.fullname
          }
          message={message}
        />
      </div>
    )
  }
)
MessageRow.displayName = 'MessageRow'

export default MessageRow

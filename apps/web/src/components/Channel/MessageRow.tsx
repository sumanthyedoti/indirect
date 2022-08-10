import { useRef, FC, useEffect, memo } from 'react'

import * as T from '@api-types/messages'
import MessageDate from '../atoms/MessageDate'
import Message from '../molecules/Message'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQuerySpaceUsers } from '../../queries'

interface MessageRowProps {
  index: number
  messages: T.Message[]
  style: any
  setRowHeight: (index: number, size: number) => void
}
const MessageRow: FC<MessageRowProps> = memo(
  ({ index: i, messages, style, setRowHeight }: any) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const { spaceId } = useUserStore()
    const { data: users } = useQuerySpaceUsers(spaceId)
    useEffect(() => {
      if (rowRef.current) {
        // console.log(
        //   rowRef.current.clientHeight,
        //   rowRef.current.dataset.i,
        //   rowRef.current.getBoundingClientRect().height
        // )
        setRowHeight(i, rowRef.current.getBoundingClientRect().height)
      }
      // eslint-disable-next-line
    })
    const prevDate = messages[i - 1]
      ? new Date(messages[i - 1].created_at).getDate()
      : null
    const currentDate = new Date(messages[i]?.created_at).getDate()
    if (!users) return null
    return (
      <div ref={rowRef} data-i={i} style={style}>
        {currentDate !== prevDate && (
          <div className="pb-0 mt-3 border-t border-gray-500">
            <MessageDate timestamp={messages[i].created_at} />
          </div>
        )}
        <Message
          key={messages[i].id}
          createdAt={messages[i].created_at}
          senderName={
            users.idMap[messages[i].sender_id]?.display_name ||
            users.idMap[messages[i].sender_id]?.fullname
          }
          message={messages[i]}
        />
      </div>
    )
  }
)
MessageRow.displayName = 'MessageRow'

export default MessageRow

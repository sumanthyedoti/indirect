import { useRef, FC, useEffect, memo } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import * as T from '@api-types/messages'
// import MessagesOfADay from './MessagesOfADay'
import MessageDate from '../atoms/MessageDate'
import Message from '../molecules/Message'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQueryChannelMessages, useQuerySpaceUsers } from '../../queries'

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

const ChannelMessages: FC = () => {
  const { channelId } = useUserStore()
  const listRef = useRef(null)
  const rowHeights = useRef<Record<number, number>>({})
  const { data: messages } = useQueryChannelMessages(channelId)

  // const socket = useSocket()
  // useEffect(() => {
  //   socket.on('message_received', (msg: T.Message) => {
  //     if (msg.channel_id !== channelId) return
  //     setMessages((messages) => [...messages, msg])
  //   })
  //   return () => {
  //     socket.off('message_received')
  //     toast.dismiss()
  //   }
  // }, [])

  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom()
    }
    // eslint-disable-next-line
  }, [messages])

  function scrollToBottom() {
    //@ts-ignore
    listRef.current?.scrollToItem(messages.length - 1, 'end')
  }

  function getRowHeight(index: number) {
    return rowHeights.current[index] + 8 || 70
  }

  function setRowHeight(index: number, size: number) {
    rowHeights.current = { ...rowHeights.current, [index]: size }
  }

  if (!messages) return null

  return (
    <article
      className={`h-full overflow-y-auto
        flex flex-col main-view-padding
      `}
    >
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => {
          return (
            <List
              height={height}
              ref={listRef}
              width={width}
              itemCount={messages.length}
              itemSize={getRowHeight}
            >
              {({ index, style }) => (
                <MessageRow
                  messages={messages}
                  index={index}
                  style={style}
                  setRowHeight={setRowHeight}
                />
              )}
            </List>
          )
        }}
      </AutoSizer>
    </article>
  )
}

export default ChannelMessages

import { useRef, FC, useEffect } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// import MessagesOfADay from './MessagesOfADay'
import MessageRow from './MessageRow'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQueryChannelMessages } from '../../queries'

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

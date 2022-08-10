import { useRef, FC, forwardRef } from 'react'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// import * as T from '@api-types/messages'
// import MessagesOfADay from './MessagesOfADay'
import MessageDate from '../atoms/MessageDate'
import Message from '../molecules/Message'
import useUserStore from '../../store/useUserStore'
// import useSocket from '../../hooks/useSocket'
import { useQueryChannelMessages, useQuerySpaceUsers } from '../../queries'

const ChannelMessages: FC = () => {
  const { channelId, spaceId } = useUserStore()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { data: users } = useQuerySpaceUsers(spaceId)
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

  if (!messages) return null

  const Row = ({ index: i, style }: any) => {
    const prevDate = messages[i - 1]
      ? new Date(messages[i - 1].created_at).getDate()
      : null
    const currentDate = new Date(messages[i]?.created_at).getDate()
    if (!users) return null
    return (
      <div style={style}>
        {currentDate !== prevDate ? (
          <div className="pb-0 mt-3 border-t border-gray-500">
            <MessageDate timestamp={messages[i].created_at} />
            <Message
              key={messages[i].id}
              createdAt={messages[i].created_at}
              className="mt-0"
              senderName={
                users.idMap[messages[i].sender_id]?.display_name ||
                users.idMap[messages[i].sender_id]?.fullname
              }
              message={messages[i]}
            />
          </div>
        ) : (
          <Message
            key={messages[i].id}
            createdAt={messages[i].created_at}
            senderName={
              users.idMap[messages[i].sender_id]?.display_name ||
              users.idMap[messages[i].sender_id]?.fullname
            }
            message={messages[i]}
          />
        )}
      </div>
    )
  }

  function handleOnWheel({ deltaY }: any) {
    // Your handler goes here ...
    console.log(messagesContainerRef.current?.scrollTop, deltaY)
    messagesContainerRef.current?.focus()
  }
  const outerElementType = forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
  ))
  outerElementType.displayName = 'outerElementType'

  return (
    <article
      ref={messagesContainerRef}
      className={`h-full overflow-y-auto
        flex flex-col main-view-padding
      `}
    >
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => {
          return (
            <List
              height={height}
              itemCount={messages.length}
              outerElementType={outerElementType}
              itemSize={() => 70}
              width={width}
            >
              {Row}
            </List>
          )
        }}
      </AutoSizer>
    </article>
  )
}

export default ChannelMessages

import { useCallback, useEffect, FC } from 'react'
import { useQueryClient } from 'react-query'

import { Message as MessageT } from '@api-types/messages'
import Header from './Header'
import { useSocket } from '../../hooks'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import useUserStore from '../../store/useUserStore'
// import { usePostChannelMessage } from '../../queries'

const Channel: FC = () => {
  const { user, channelId, spaceId } = useUserStore()
  const queryClient = useQueryClient()
  const socket = useSocket()
  // const { mutate: postMessage } = usePostChannelMessage(channelId)
  // const handleMessageSubmit = useCallback((text: string) => {
  //   if (!user) return
  //   postMessage({
  //     text,
  //   })
  // }, [])
  useEffect(() => {
    socket.on('message-failed', (tempId: number, channelId: number) => {
      console.log('message-failed')
      queryClient.setQueryData<MessageT[] | undefined>(
        ['channel-messages', channelId],
        (messages) => messages?.filter((message) => message.id !== tempId)
      )
    })
    socket.on('message-success', () => {
      console.log('message-success')
      queryClient.invalidateQueries(['channel-messages', channelId])
    })
  }, [socket])

  const handleMessageSubmit = useCallback(
    (text: string) => {
      const tempId = Date.now()
      queryClient.setQueryData<MessageT[] | undefined>(
        ['channel-messages', channelId],
        (oldData) => {
          return [
            //@ts-ignore
            ...oldData,
            {
              id: tempId,
              text,
              sender_id: user.id,
              channel_id: channelId,
              created_at: Date.now(),
            },
          ]
        }
      )
      socket.emit('message', text, tempId, channelId, spaceId)
    },
    [channelId, socket]
  )
  return (
    <div
      className={`
          w-full flex flex-col relative h-full bg-slate-800
    `}
    >
      <Header />
      <ChannelMessages />
      <MessageInput className="mx-3 mb-2" onSubmit={handleMessageSubmit} />
    </div>
  )
}

export default Channel

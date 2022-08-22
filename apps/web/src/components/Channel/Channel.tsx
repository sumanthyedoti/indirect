import { useCallback, useEffect, FC } from 'react'
import { useQueryClient } from 'react-query'
import { Descendant } from 'slate'

import { Message as MessageT } from '@api-types/messages'
import Header from './Header'
import { useSocket } from '../../hooks'
import ChannelMessages from './ChannelMessages'
import MessageInput from './MessageInput'
import useUserStore from '../../store/useUserStore'

const Channel: FC = () => {
  const { user, channelId } = useUserStore()
  const queryClient = useQueryClient()
  const socket = useSocket()
  useEffect(() => {
    socket.on('message-failed', onMessageFail)
    socket.on('message-success', onMessageSuccess)
    return () => {
      socket.off('message-failed', onMessageFail)
      socket.off('message-success', onMessageSuccess)
    }
  }, [])

  const onMessageFail = (tempId: number, channelId: number) => {
    console.log('message-failed')
    queryClient.setQueryData<MessageT[] | undefined>(
      ['channel-messages', channelId],
      (messages) => messages?.filter((message) => message.id !== tempId)
    )
  }

  const onMessageSuccess = (tempId: number, message: MessageT) => {
    console.log('message-success')
    // queryClient.invalidateQueries(['channel-messages', channelId])
    queryClient.setQueryData<MessageT[] | undefined>(
      ['channel-messages', message.channel_id],
      (messages) => {
        const storedMessage = messages?.find((msg) => msg.id === message.id)
        if (!storedMessage && !!messages) {
          return [...messages?.filter((msg) => msg.id !== tempId), message]
        }
        return messages
      }
    )
  }

  const handleMessageSubmit = useCallback(
    (input: Descendant[]) => {
      const tempId = Date.now()
      queryClient.setQueryData<MessageT[] | undefined>(
        ['channel-messages', channelId],
        (oldData) => {
          return [
            //@ts-ignore
            ...oldData,
            {
              id: tempId,
              text: JSON.stringify(input),
              sender_id: user.id,
              channel_id: channelId,
              created_at: Date.now(),
            },
          ]
        }
      )
      // socket.emit('message', JSON.stringify(input), tempId, channelId)
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

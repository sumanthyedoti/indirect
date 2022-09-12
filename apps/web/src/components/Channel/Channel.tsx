import { useCallback, useEffect, FC } from 'react'
import { useQueryClient } from 'react-query'
import { serializeMessage } from '../../utils'

import {
  Message as MessageT,
  SocketMessage as SocketMessageT,
  SocketMessageFial as SocketMessageFialT,
  SocketMessageSuccess as SocketMessageSuccessT,
} from '@api-types/messages'
import Header from './Header'
import { useSocket } from '../../hooks'
import ChannelMessages from './ChannelMessages'
import MessageInput from './MessageInput'
import useUserStore from '../../store/useUserStore'
import {} from '../../utils'

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

  const onMessageFail = ({ tempId, channelId }: SocketMessageFialT) => {
    console.log('message-failed')
    queryClient.setQueryData<MessageT[] | undefined>(
      ['channel-messages', channelId],
      (messages) => messages?.filter((message) => message.id !== tempId)
    )
  }

  const onMessageSuccess = ({ tempId, message }: SocketMessageSuccessT) => {
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
    (input: any[]) => {
      if (!channelId) return
      const html = serializeMessage(input)
      console.log(html)
      const tempId = Date.now()
      queryClient.setQueryData<MessageT[] | undefined>(
        ['channel-messages', channelId],
        //@ts-ignore
        (oldData) => {
          const tempMessage = {
            id: tempId,
            html,
            sender_id: user.id,
            channel_id: channelId,
            created_at: Date.now(),
          }
          if (!oldData) {
            return [tempMessage]
          }
          return [
            //@ts-ignore
            ...oldData,
            tempMessage,
          ]
        }
      )

      const message: SocketMessageT = {
        html,
        tempId,
        channelId,
      }
      socket.emit('message', message)
    },
    [channelId, socket]
  )

  return (
    <>
      <Header />
      <article
        className={`h-full shrink mr-2 overflow-y-auto
      `}
      >
        <ChannelMessages />
      </article>
      <div className="mb-2 main-view-padding">
        <MessageInput onSubmit={handleMessageSubmit} />
      </div>
    </>
  )
}

export default Channel

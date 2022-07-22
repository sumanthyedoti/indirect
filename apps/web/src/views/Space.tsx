import { useState, useEffect, useCallback, memo, FC } from 'react'
import toast from 'react-hot-toast'

import * as T from '@api-types/messages'
import { MessageInput } from '../components/molecules'
import { ChannelMessages, SidePanel } from '../components'
import userStore from '../store/userStore'
import api from '../axios'
import useSocket from '../hooks/useSocket'
import { appErrorToastOptions } from '../utils'

const Space: FC = () => {
  const { user, channelId } = userStore()
  const socket = useSocket()
  const [messages, setMessages] = useState<T.Message[]>([])
  useEffect(() => {
    socket.on('message_received', (msg: T.Message) => {
      if (msg.channel_id !== channelId) return
      setMessages((messages) => [...messages, msg])
    })
    return () => {
      socket.off('message_received')
      toast.dismiss()
    }
  }, [])
  useEffect(() => {
    fetchMessages(channelId)
  }, [channelId])
  const fetchMessages = async (channelId: number) => {
    try {
      const { data } = await api.get(`/channels/${channelId}/messages`)

      setMessages(data.data)
    } catch (err) {
      console.log(err)
      toast.error('Error fetching messages', {
        ...appErrorToastOptions,
        id: 'get-messages-error',
      })
    }
  }
  const handleMessageSubmit = useCallback(
    async (text: string) => {
      try {
        await api.post('/messages', {
          sender_id: user?.id,
          channel_id: channelId,
          text,
        })
      } catch (err) {
        console.log(err)
        toast.error('Error sending message', {
          ...appErrorToastOptions,
          id: 'post-messages-error',
        })
      }
    },
    [channelId]
  )

  return (
    <div className="flex h-screen">
      <SidePanel />
      <div
        className={`
          w-full flex flex-col relative h-full bg-slate-800 py-2 px-4
    `}
      >
        <ChannelMessages messages={messages} />
        <MessageInput className="-ml-1 -mr-1" onSubmit={handleMessageSubmit} />
      </div>
    </div>
  )
}
export default memo(Space, () => true)

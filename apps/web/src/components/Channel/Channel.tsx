import { useState, useEffect, useCallback, FC } from 'react'
import toast from 'react-hot-toast'

import Header from './MainHeader'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import useUserStore from '../../store/useUserStore'
import type * as T from '@api-types/messages'
import api from '../../axios'
import useSocket from '../../hooks/useSocket'

const Channel: FC = () => {
  const { user, channelId, logout } = useUserStore()
  const [messages, setMessages] = useState<T.Message[]>([])
  const socket = useSocket()
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
    if (channelId) {
      fetchMessages(channelId)
    }
  }, [channelId])
  const fetchMessages = async (channelId: number) => {
    try {
      const { data } = await api.get(`/channels/${channelId}/messages`)

      setMessages(data.data)
    } catch (err) {
      if (err.response.status === 401) {
        logout()
      }

      toast.error('Error fetching messages', {
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
          id: 'post-messages-error',
        })
      }
    },
    [channelId]
  )
  return (
    <div
      className={`
          w-full flex flex-col relative h-full bg-slate-800
    `}
    >
      <Header />
      <ChannelMessages messages={messages} />
      <MessageInput className="mx-3 mb-2" onSubmit={handleMessageSubmit} />
    </div>
  )
}

export default Channel

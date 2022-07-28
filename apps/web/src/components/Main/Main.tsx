import { useState, useEffect, useCallback, FC } from 'react'
import toast from 'react-hot-toast'

import * as T from '@api-types/messages'
import Header from './MainHeader'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import { SidePanel } from '../../components'
import useUserStore from '../../store/useUserStore'
import api from '../../axios'
import useSocket from '../../hooks/useSocket'
import { appErrorToastOptions } from '../../config/toastConfig'

const Space: FC = () => {
  const { user, channelId } = useUserStore()
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
    <div className="flex h-screen max-h-screen">
      <SidePanel />
      <div
        className={`
          w-full flex flex-col relative h-full bg-slate-800
    `}
      >
        <Header />
        <ChannelMessages messages={messages} />
        <MessageInput className="mx-3 mb-2" onSubmit={handleMessageSubmit} />
      </div>
    </div>
  )
}
export default Space

import { useState, useEffect, memo, FC } from 'react'
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
    socket.on('message_received', (msg) => {
      setMessages((messages) => [...messages, msg])
    })
    fetchMessages()

    return () => {
      socket.off('message_received')
      toast.dismiss()
    }
  }, [])
  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/messages')

      setMessages(data.data)
    } catch (err) {
      console.log(err)
      toast.error('Error fetching messages', {
        ...appErrorToastOptions,
        id: 'get-messages-error',
      })
    }
  }
  const onMessageSubmit = async (text: string) => {
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
  }

  return (
    <div className="flex h-screen">
      <SidePanel />
      <div
        className={`
          w-full flex flex-col relative h-full bg-slate-800 py-2 px-4
    `}
      >
        <ChannelMessages messages={messages} />
        <MessageInput className="-ml-1 -mr-1" onSubmit={onMessageSubmit} />
      </div>
    </div>
  )
}
export default memo(Space, () => true)

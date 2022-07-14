import { useState, useEffect, memo, FC } from 'react'
import { toast } from 'react-toastify'

import {
  MessageInput,
  MessagesContainer,
  Message,
} from '../components/molecules'
import userStore from '../store/userStore'
import api from '../axios'
import { useQueryUsers } from '../queries'
import useSocket from '../hooks/useSocket'
import T from '../types.d'
import { errorToastOptions } from '../utils'

const Space: FC = () => {
  const { user } = userStore()
  const socket = useSocket()
  const { data: users, isSuccess } = useQueryUsers()
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
      console.log('errrrrr')
      toast.dark('Error fetching messages', {
        ...errorToastOptions,
        toastId: 'get-messages',
      })
    }
  }
  const onMessageSubmit = async (text: string) => {
    await api.post('/messages', {
      sender_id: user?.id,
      text,
    })
  }
  if (!isSuccess) return null
  return (
    <div
      className={`
        flex flex-col w-5/6 w-11/12 relative
        h-screen p-3 mx-auto
        lg:w-2/3 bg-slate-800
        shadow-xl shadow-slate-700/60
        `}
    >
      <MessagesContainer>
        {messages.map((m) => {
          return (
            <Message
              key={m.id}
              senderName={user && users[m.sender_id].fullname}
              message={m}
            />
          )
        })}
      </MessagesContainer>
      <MessageInput onSubmit={onMessageSubmit} />
    </div>
  )
}
export default memo(Space, () => true)

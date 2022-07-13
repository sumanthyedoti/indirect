import { useState, useEffect, FC } from 'react'
import { MessageArea } from '../components/molecules'

import userStore from '../store/userStore'
import api from '../axios'
import useSocket from '../hooks/useSocket'

type Message = {
  text: string
  sender_id: number
  id: number
}

const Space: FC = () => {
  const { user } = userStore()
  const socket = useSocket()
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    socket.on('message_received', (msg) => {
      console.log({ msg })
    })
    fetchMessages()
  }, [])
  const fetchMessages = async () => {
    const { data } = await api.get('/messages')
    setMessages(data.data)
  }
  const onMessageSubmit = async (text: string) => {
    await api.post('/messages', {
      sender_id: user?.id,
      text,
    })
  }
  return (
    <div
      className={`
        flex flex-col w-5/6 w-11/12 relative
        h-screen p-2 mx-auto
        lg:w-2/3 bg-slate-800
        shadow-xl shadow-slate-700/60
        `}
    >
      <span className="absolute top-0, right-0">{user?.fullname}</span>
      <div className="h-full mb-2 overflow-y-auto">
        {messages.map((m) => {
          return <p key={m.id}>{m.text}</p>
        })}
      </div>
      <MessageArea onSubmit={onMessageSubmit} />
    </div>
  )
}
export default Space

import { useState, useEffect, useCallback, FC } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import * as T from '@api-types/messages'
import Header from './MainHeader'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import SpacesBar from '../SpacesBar'
import SidePanel from '../SidePanel'
import useUserStore from '../../store/useUserStore'
import { useQueryUserSpaces } from '../../queries'
import api from '../../axios'
import useSocket from '../../hooks/useSocket'

const Space: FC = () => {
  const { user, channelId, setSpaceId, setChannelId, logout } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  const socket = useSocket()
  const params = useParams()
  const navigate = useNavigate()
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
  /* set space and general channel IDs */
  useEffect(() => {
    if (params.spaceId) {
      const spaceId = parseInt(params.spaceId)
      const space = spaces?.find((s) => s.id === spaceId)
      space ? setSpaceId(space.id) : navigate('/') //TODO: show error view
      setChannelId(1) // TODO: change to general channel of the space
    } else {
      navigate('/')
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
    <div className="flex h-screen max-h-screen">
      <SpacesBar />
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

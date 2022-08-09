import { useCallback, FC } from 'react'
import toast from 'react-hot-toast'

import Header from './Header'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import useUserStore from '../../store/useUserStore'
import api from '../../axios'

const Channel: FC = () => {
  const { user, channelId } = useUserStore()
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
      <ChannelMessages />
      <MessageInput className="mx-3 mb-2" onSubmit={handleMessageSubmit} />
    </div>
  )
}

export default Channel

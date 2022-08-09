import { useCallback, FC } from 'react'

import Header from './Header'
import ChannelMessages from './ChannelMessages'
import { MessageInput } from '../../components/molecules'
import useUserStore from '../../store/useUserStore'
import { usePostChannelMessage } from '../../queries'

const Channel: FC = () => {
  const { user, channelId } = useUserStore()
  const { mutate: postMessage } = usePostChannelMessage(channelId)
  const handleMessageSubmit = useCallback((text: string) => {
    if (!user) return
    postMessage({
      text,
    })
  }, [])
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

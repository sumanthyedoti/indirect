import { FC } from 'react'
import classnames from 'classnames'

import { Channel as ChannelT } from '@api-types/channels'
import userStore from '../../store/userStore'

interface ChannelNameProps {
  onClick: (id: number) => void
  channel: ChannelT
}

const ChannelName: FC<ChannelNameProps> = ({ onClick, channel }) => {
  const { channelId } = userStore()
  return (
    <button
      onClick={() => onClick(channel.id)}
      key={channel.id}
      className={classnames(
        'flex space-x-1 w-full hover:bg-slate-800 focus:bg-slate-800 outline-none',
        [channel.id === channelId && 'text-neutral-100']
      )}
    >
      <span
        className={classnames('text-lg', {
          'text-zinc-400': channel.id !== channelId,
        })}
      >
        #
      </span>
      <span
        className={classnames({
          'font-bold': channel.id === channelId,
        })}
      >
        {channel.name}
      </span>
    </button>
  )
}

export default ChannelName

import { FC } from 'react'
import classnames from 'classnames'

import { Channel as ChannelT } from '@api-types/channels'
import useUserStore from '../../store/useUserStore'

interface ChannelNameProps {
  onClick: (id: number) => void
  channel: ChannelT
}

const ChannelName: FC<ChannelNameProps> = ({ onClick, channel }) => {
  const { channelId } = useUserStore()
  return (
    <div
      className={classnames('py-0.5', [
        channel.id === channelId && 'bg-sky-900',
        channel.id !== channelId && 'hover:bg-slate-800',
      ])}
    >
      <button
        onClick={() => onClick(channel.id)}
        key={channel.id}
        className={classnames(
          'flex space-x-1 w-full rounded-none side-panel-item-padding',
          {
            'text-neutral-100': channel.id === channelId,
          }
        )}
      >
        <span
          className={classnames('text-lg', {
            'text-zinc-400': channel.id !== channelId,
          })}
        >
          #
        </span>
        <span>{channel.name}</span>
      </button>
    </div>
  )
}

export default ChannelName

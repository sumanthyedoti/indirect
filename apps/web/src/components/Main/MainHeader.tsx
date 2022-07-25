import { FC } from 'react'

import userStore from '../../store/userStore'
import { ChevronDown } from '../../icons'
import { useQueryChannel } from '../../queries'

const SideHeader: FC = () => {
  const { channelId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  if (!isSuccess) return null
  return (
    <div className="mb-0 text-base border-b border-gray-600 side-panel-padding">
      <button className="flex items-center space-x-1">
        <span># {channel.name} </span>
        <span className="w-3 h-3">
          <ChevronDown />
        </span>
      </button>
    </div>
  )
}

export default SideHeader

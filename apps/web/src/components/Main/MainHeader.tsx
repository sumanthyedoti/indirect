import { FC } from 'react'
import userStore from '../../store/userStore'

import { useQueryChannel } from '../../queries'

const SideHeader: FC = () => {
  const { spaceId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(spaceId)
  if (!isSuccess) return null
  return (
    <h2 className="mb-0 text-base border-b border-gray-600 side-panel-padding">
      # {channel.name}
    </h2>
  )
}

export default SideHeader

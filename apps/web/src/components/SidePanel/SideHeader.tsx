import { FC } from 'react'
import useUserStore from '../../store/useUserStore'

import { useQuerySpace } from '../../queries'

const SideHeader: FC = () => {
  const { spaceId } = useUserStore()
  const { data: space, isSuccess } = useQuerySpace(spaceId)

  if (!isSuccess) return null
  return (
    <h2 className="py-2 mb-0 text-base border-b border-gray-700 side-panel-item-padding shadow-sm shadow-gray-700 side-panel-padding">
      {space.name}
    </h2>
  )
}

export default SideHeader

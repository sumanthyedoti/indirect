import { FC } from 'react'
import useUserStore from '../../store/useUserStore'

import { useQuerySpace } from '../../queries'

const SideHeader: FC = () => {
  const { spaceId } = useUserStore()
  const { data: space, isSuccess } = useQuerySpace(spaceId)

  if (!isSuccess) return null
  return (
    <h2 className="mb-0 text-base border-b border-gray-700 shadow-sm shadow-gray-700 side-panel-padding">
      {space.name}
    </h2>
  )
}

export default SideHeader

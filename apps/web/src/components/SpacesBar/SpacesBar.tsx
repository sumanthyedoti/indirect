import { FC } from 'react'

import { useQueryUserSpaces } from '../../queries'
import { useUserStore } from '../../store'

interface SpacesBarProps {
  dummy?: null
}

const SpacesBar: FC<SpacesBarProps> = () => {
  const { user } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  console.log(spaces)

  return <div className="w-100">Spaces</div>
}

export default SpacesBar

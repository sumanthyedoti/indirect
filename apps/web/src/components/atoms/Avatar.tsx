import { FC } from 'react'
import classnames from 'classnames'
import { useUserName } from '../../hooks'

interface Props {
  spaceId?: number
}
const Avatar: FC<Props> = ({ spaceId }) => {
  const name = useUserName(spaceId)

  if (!name) return null

  return (
    <div
      className={classnames(
        'rounded-sm bg-blue-600',
        'flex justify-center items-center w-full h-full'
      )}
    >
      <span className="font-semibold">{name[0]}</span>
    </div>
  )
}

export default Avatar

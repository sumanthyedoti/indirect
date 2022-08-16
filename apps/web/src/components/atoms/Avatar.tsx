import { FC } from 'react'
import classnames from 'classnames'
import { useUserName } from '../../hooks'

interface AvatarProps {
  large?: boolean
}

const Avatar: FC<AvatarProps> = ({ large }) => {
  const name = useUserName()

  if (!name) return null

  return (
    <div
      className={classnames(
        'rounded-sm bg-blue-600',
        'flex justify-center items-center',
        {
          'w-8 h-8': large,
          'w-6 h-6': !large,
        }
      )}
    >
      <span className="font-semibold">{name[0]}</span>
    </div>
  )
}

export default Avatar

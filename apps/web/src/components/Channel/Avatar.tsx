import { FC } from 'react'
import classnames from 'classnames'
import { useUserStore } from '../../store'

interface AvatarProps {
  large?: boolean
}

const Avatar: FC<AvatarProps> = ({ large }) => {
  const { user } = useUserStore()
  return (
    <div
      className={classnames(
        'rounded-sm bg-blue-600 text-center font-semibold',
        {
          'w-6 h-6': !large,
          'w-8 h-8': large,
        }
      )}
    >
      {user?.fullname[0]}
    </div>
  )
}

export default Avatar

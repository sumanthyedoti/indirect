import { FC } from 'react'
import classnames from 'classnames'
import { useUserStore } from '../../store'
import { useQuerySpaceUsers } from '../../queries'

interface AvatarProps {
  large?: boolean
}

let name = ''

const Avatar: FC<AvatarProps> = ({ large }) => {
  const { user, spaceId } = useUserStore()
  const { data: users } = useQuerySpaceUsers(spaceId)
  if (!users || !user) return null
  const usersMap = users.idMap
  name = usersMap[user.id].display_name || user.fullname
  return (
    <div
      className={classnames(
        'rounded-sm bg-blue-600',
        'flex justify-center items-center',
        {
          'w-6 h-6 leading-5 ': !large,
          'w-8 h-8 leading-6': large,
        }
      )}
    >
      <span className="font-semibold">{name[0]}</span>
    </div>
  )
}

export { Avatar as default, name }

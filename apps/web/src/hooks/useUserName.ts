import { useQuerySpaceUsers } from '../queries'
import { useUserStore } from '../store'

const useUserName = (): string | null => {
  const { user, spaceId } = useUserStore()
  const { data: users } = useQuerySpaceUsers(spaceId)
  if (!users || !user) return null
  const usersMap = users.idMap
  const name = usersMap[user.id]
    ? usersMap[user.id].display_name || user.fullname
    : null
  return name
}

export default useUserName

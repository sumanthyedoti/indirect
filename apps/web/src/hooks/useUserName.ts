import { useQuerySpaceUsers } from '../queries'
import { useUserStore } from '../store'

const useUserName = (): string | null => {
  const { user, spaceId } = useUserStore()
  const { data: users } = useQuerySpaceUsers(spaceId)
  if (!user) return null
  const usersMap = users?.idMap
  const name =
    usersMap && usersMap[user.id]
      ? usersMap[user.id].display_name
      : user.fullname
  return name
}

export default useUserName

import { useQuerySpaceProfiles } from '../queries'
import { useUserStore } from '../store'

const useUserName = (spaceId?: number): string | null => {
  const { user } = useUserStore()
  const { data: spaceProfiles, isLoading } = useQuerySpaceProfiles(spaceId)

  if (isLoading) return null

  const profile = spaceProfiles?.idMap[user.id]
  if (profile?.display_name) return profile.display_name
  return user.fullname
}

export default useUserName

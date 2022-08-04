import { useEffect, FC } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import SpacesBar from '../components/SpacesBar'
import SidePanel from '../components/SidePanel'
import { useUserStore, useSpaceStore } from '../store'
import { useQueryUserSpaces } from '../queries'

const Space: FC = () => {
  const { setSpaceId, user } = useUserStore()
  const { setSpace } = useSpaceStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.spaceId) {
      /* set space ID from URL param */
      const spaceId = parseInt(params.spaceId)
      const space = spaces?.find((s) => s.id === spaceId)
      if (space) {
        setSpace(space)
        setSpaceId(space.id)
        console.log('gg', space.general_channel_id)

        navigate(`./${space.general_channel_id}`, { replace: true })
      }
    } else {
      navigate('/')
    }
  }, [params.spaceId])

  return (
    <div className="flex h-screen max-h-screen">
      <SpacesBar />
      <SidePanel />
      <Outlet />
    </div>
  )
}
export default Space

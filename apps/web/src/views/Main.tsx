import { useEffect, FC } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { Channel as ChannelT } from '@api-types/channels'
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
  const queryClient = useQueryClient()

  useEffect(() => {
    if (params.spaceId) {
      /* set space ID from URL param */
      const spaceId = parseInt(params.spaceId)
      const space = spaces?.find((s) => s.id === spaceId)
      space && setSpace(space)
      space ? setSpaceId(space.id) : navigate('/') //TODO: show error view
      /* set general Channel id */
      const channels = queryClient.getQueryData<ChannelT[]>([
        'channels',
        spaceId,
      ])
      const generalChannel = channels?.find(
        (c) => c.id === space?.general_channel_id
      )
      if (generalChannel) {
        navigate(`./${generalChannel.id}`, { replace: true })
      } else {
        navigate('/')
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

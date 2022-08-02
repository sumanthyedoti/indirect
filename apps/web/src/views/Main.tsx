import { useEffect, FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { Channel as ChannelT } from '@api-types/channels'
import SpacesBar from '../components/SpacesBar'
import SidePanel from '../components/SidePanel'
import Channel from '../components/Channel'
import useUserStore from '../store/useUserStore'
import { useQueryUserSpaces } from '../queries'

const Space: FC = () => {
  const { spaceId, setSpaceId, setChannelId, user } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  const params = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /* set space and general channel IDs */
  useEffect(() => {
    if (params.spaceId) {
      const spaceId = parseInt(params.spaceId)
      const space = spaces?.find((s) => s.id === spaceId)
      space ? setSpaceId(space.id) : navigate('/') //TODO: show error view
    } else {
      navigate('/')
    }
  }, [])
  useEffect(() => {
    // set general Channel id
    const channels = queryClient.getQueryData<ChannelT[]>(['channels', spaceId])
    const generalChannel = channels?.find((c) => c.is_general)
    if (generalChannel) {
      setChannelId(generalChannel.id)
    }
  }, [spaceId])
  return (
    <div className="flex h-screen max-h-screen">
      <SpacesBar />
      <SidePanel />
      <Channel />
    </div>
  )
}
export default Space

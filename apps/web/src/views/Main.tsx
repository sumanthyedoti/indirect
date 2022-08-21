import { useEffect, useState, FC } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { useSocket } from '../hooks'

import SpacesBar from '../components/SpacesBar'
import SidePanel from '../components/SidePanel'
import { useUserStore, useSpaceStore } from '../store'
import { useQueryUserSpaces, useQuerySpace } from '../queries'
import { useAuthPing } from '../hooks'

const Space: FC = () => {
  const { setSpaceId, user } = useUserStore()
  const { setSpace } = useSpaceStore()
  const [spaceParamId, setSpaceParamId] = useState<number | undefined>(
    undefined
  )
  const { data: userSpaces, isError: isUserSpacesError } = useQueryUserSpaces(
    user?.id
  )
  const { data: space } = useQuerySpace(spaceParamId)

  const params = useParams()
  const navigate = useNavigate()
  const socket = useSocket()

  useAuthPing()

  useEffect(() => {
    socket.emit('join-channel-rooms')
  }, [])

  useEffect(() => {
    if (!params.spaceId) return
    setSpaceParamId(parseInt(params.spaceId))
  }, [params.spaceId])

  useEffect(() => {
    if (isUserSpacesError) {
      navigate('/', { replace: true })
      toast.error('Error while loading data!')
    }
    if (!spaceParamId || !userSpaces || !space) {
      return
    }
    /* set space state from URL param */
    const visitedSpace = userSpaces.find((s) => s.id === spaceParamId)
    const isUserSpace = !!visitedSpace
    if (isUserSpace) {
      setSpace(visitedSpace)
      setSpaceId(visitedSpace.id)
    }
    // route to join is the user is not member of the space
    if (!isUserSpace && !space.is_private) {
      navigate(`./join`, { replace: true })
      return
    }
    // route to root if user is not a memeber of visited space and it is private
    if (!isUserSpace && space.is_private) {
      navigate(`/`, { replace: true })
      return
    }
    // route to general_channel_id if no channel param is visited
    if (isUserSpace && !params.channelId) {
      navigate(`./${visitedSpace.general_channel_id}`, { replace: true })
    }
  }, [spaceParamId, userSpaces, isUserSpacesError, space])

  if (isUserSpacesError || !params.spaceId || !space) return null

  return (
    <div className="flex h-screen max-h-screen">
      <SpacesBar />
      <SidePanel />
      <Outlet />
    </div>
  )
}

export default Space

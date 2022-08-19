import { useEffect, useState, FC } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

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

  useAuthPing()

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
    /* set space ID from URL param */
    const userSpace = userSpaces.find((s) => s.id === spaceParamId)
    if (userSpace) {
      setSpace(userSpace)
      setSpaceId(userSpace.id)
    }
    if (!userSpace && !space.is_private) {
      navigate(`./join`, { replace: true })
      return
    }
    if (!userSpace && space.is_private) {
      navigate(`/`, { replace: true })
      return
    }
    if (!params.channelId && userSpace) {
      navigate(`./${userSpace.general_channel_id}`, { replace: true })
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

  return null
}

export default Space

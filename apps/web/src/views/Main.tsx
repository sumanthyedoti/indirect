import { useEffect, FC } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import SpacesBar from '../components/SpacesBar'
import SidePanel from '../components/SidePanel'
import { useUserStore, useSpaceStore } from '../store'
import { useQueryUserSpaces } from '../queries'
import { useAuthPing } from '../hooks'

const Space: FC = () => {
  const { setSpaceId, user } = useUserStore()
  const { setSpace } = useSpaceStore()
  const { data: spaces, isError } = useQueryUserSpaces(user?.id)
  const params = useParams()
  const navigate = useNavigate()

  useAuthPing()
  useEffect(() => {
    console.log('Main')
  }, [])
  useEffect(() => {
    if (isError) {
      navigate('/')
      toast.error('Error while loading data!')
    }
    if (!params.spaceId || !spaces) {
      return
    }
    /* set space ID from URL param */
    const spaceId = parseInt(params.spaceId)
    const space = spaces.find((s) => s.id === spaceId)
    if (!space) {
      navigate('/')
      return
    }
    setSpace(space)
    setSpaceId(space.id)
    if (!params.channelId) {
      navigate(`./${space.general_channel_id}`, { replace: true })
    }
  }, [params.spaceId, spaces, isError])

  if (!spaces || !params.spaceId) return null

  return (
    <div className="flex h-screen max-h-screen">
      <SpacesBar />
      <SidePanel />
      <Outlet />
    </div>
  )
}

export default Space

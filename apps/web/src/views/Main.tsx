import { useEffect, useState, lazy, Suspense, FC } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useParams, useNavigate, Outlet } from 'react-router-dom'

import {
  SpaceUser as SpaceUserT,
  UserLeftSpace as UserLeftSpaceT,
} from '@api-types/spaces'
import { useSocket } from '../hooks'
import { useUserStore, useSpaceStore } from '../store'
import {
  useQueryUserSpaces,
  useQuerySpace,
  addProfileToSpaceProfiles,
  deactivateSpaceProfile,
  UsersQueryT,
} from '../queries'
import { useAuthPing } from '../hooks'
import { SpacesBarLoader } from '../components/SpacesBar'
import { SidePanelLoader } from '../components/SidePanel'
const SpacesBar = lazy(() => import('../components/SpacesBar'))
const SidePanel = lazy(() => import('../components/SidePanel'))

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
  const queryClient = useQueryClient()

  useAuthPing()

  useEffect(() => {
    socket.emit('join-space-and-channels')
    socket.on('user-joined-space', onUserJoinedSpace)
    socket.on('user-left-space', onUserLeftSpace)
  }, [])

  const onUserJoinedSpace = (profile: SpaceUserT) => {
    queryClient.setQueryData<UsersQueryT>(
      ['users', profile.space_id],
      //@ts-ignore
      (profiles) => {
        return addProfileToSpaceProfiles(profile, profiles)
      }
    )
  }

  const onUserLeftSpace = ({ user_id, space_id }: UserLeftSpaceT) => {
    queryClient.setQueryData<UsersQueryT>(
      ['users', space_id],
      //@ts-ignore
      (profiles) => {
        return deactivateSpaceProfile(user_id, profiles)
      }
    )
  }

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
      <aside
        className={`flex flex-col items-center
      pt-3 w-28 lg:w-32 overflow-y-auto
      border-r border-neutral-500
      `}
      >
        <Suspense fallback={<SpacesBarLoader />}>
          <SpacesBar />
        </Suspense>
      </aside>

      <aside
        className={`
          w-1/3 lg:w-1/4 2xl:w-1/5 h-full
          shrink-0
          border-r border-neutral-600
          bg-slate-900
       `}
      >
        <Suspense fallback={<SidePanelLoader />}>
          <SidePanel />
        </Suspense>
      </aside>

      <div
        className={`
          w-full flex flex-col relative h-full bg-slate-800
        `}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Space

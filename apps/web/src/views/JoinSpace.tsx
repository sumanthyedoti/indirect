import { useEffect, useState, FC } from 'react'
import toast from 'react-hot-toast'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { Header } from '../components/molecules'
import { Button } from '../components/atoms'
import { useUserStore } from '../store'
import { ArrowBack } from '../icons'
import { useQuerySpace, useQueryUserSpaces } from '../queries'
import api from '../axios'

const JoinSPace: FC = () => {
  const { user } = useUserStore()
  const params = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [spaceParamId, setSpaceParamId] = useState<number | undefined>(
    undefined
  )
  const { data: userSpaces } = useQueryUserSpaces(user?.id)
  const { data: space, isError: isSpaceError } = useQuerySpace(spaceParamId, 1)

  useEffect(() => {
    console.log(isSpaceError)
    if (isSpaceError) {
      navigate('/')
    }
  }, [isSpaceError])

  useEffect(() => {
    if (!params.spaceId || !userSpaces) return
    const sid = parseInt(params.spaceId)
    setSpaceParamId(sid)
    const userSpace = userSpaces.find((space) => space.id === sid)
    if (userSpace) {
      navigate(`/${sid}`)
    }
  }, [params.spaceId, userSpaces])

  const handleJoin = async () => {
    try {
      console.log(user.id)

      await api.post(`/spaces/${params.spaceId}/users/${user.id}}`)
      navigate(`/${params.spaceId}`)
      queryClient.invalidateQueries(['spaces', user.id])
    } catch (err) {
      console.log(err)
      toast.error('Error joining the Space')
    }
  }

  if (!space) return null

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <Header />
        <div
          className={`
          container-width mt-16
        `}
        >
          <div
            className={`
          rounded bg-slate-800 text-center
          w-full px-6 py-8 ring ring-slate-600
            `}
          >
            <h2 className="mb-0">{space.name}</h2>
            {space.description && (
              <div className="mt-4">
                <b className="text-semibold">Description</b>
                <p dangerouslySetInnerHTML={{ __html: space.description }} />
              </div>
            )}
            <Button
              onClick={handleJoin}
              label="Join the Space"
              className="mt-8"
            />
            <Link
              to="/"
              className="flex items-center justify-center mt-4 space-x-1"
            >
              <span className="w-6 h-6">
                <ArrowBack />
              </span>
              <span>Go back to my Spaces</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinSPace

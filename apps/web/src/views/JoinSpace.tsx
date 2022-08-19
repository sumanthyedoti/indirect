import { useEffect, useState, FC } from 'react'
import { useParams, Link } from 'react-router-dom'

import { Header } from '../components/molecules'
import { Button } from '../components/atoms'
import { ArrowBack } from '../icons'
import { useQuerySpace } from '../queries'

const JoinSPace: FC = () => {
  const params = useParams()
  const [spaceParamId, setSpaceParamId] = useState<number | undefined>(
    undefined
  )
  const { data: space } = useQuerySpace(spaceParamId)

  useEffect(() => {
    if (!params.spaceId) return
    setSpaceParamId(parseInt(params.spaceId))
  }, [params.spaceId])

  // const handleJoin = () => {}

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
            <Button label="Join the Space" className="mt-8" />
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

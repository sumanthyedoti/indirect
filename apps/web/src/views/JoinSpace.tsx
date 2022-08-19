import { useEffect, FC } from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../components/molecules'

const JoinSPace: FC = () => {
  const params = useParams()

  useEffect(() => {
    console.log(params.spaceId)
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <Header />
      <div
        className={`
          md:w-2/3 lg:w-2/5 xl:w-1/3
          flex flex-col items-center
          p-10 rounded bg-slate-800
        `}
      >
        <h1>join</h1>
      </div>
    </div>
  )
}

export default JoinSPace

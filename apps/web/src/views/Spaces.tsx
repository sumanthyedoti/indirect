import { useState, FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/atoms'
import { useQueryUserSpaces } from '../queries'
import CreateSpace from '../components/SpacesBar/CreateSpace'
import { useUserStore } from '../store'

interface SpacesProps {
  dummy?: null
}

const Spaces: FC<SpacesProps> = () => {
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)
  const { user, setSpaceId } = useUserStore()
  const navigate = useNavigate()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  const onSpaceOpen = (spaceId: number) => {
    setSpaceId(spaceId)
    navigate(`${spaceId}`)
  }
  if (!spaces) return null
  return (
    <div className="p-5 mx-auto sm:px-5 md:px-0 md:w-4/5 lg:w-3/5">
      <div
        role="banner"
        className="flex flex-col justify-between mb-14 sm:flex-row sm:items-center"
      >
        <h1 className="text-4xl font-light text-white sm:mb-0">inDirect</h1>
        <Button
          onClick={() => setIsCreateSpaceModalOpen(true)}
          label="Create a new Space"
        />
      </div>
      <h1>Your Spaces</h1>
      <article className="py-2 rounded bg-slate-800 ring-4 ring-slate-600">
        {spaces.map((space) => {
          return (
            <section
              key={space.id}
              className={`
                px-6 py-4
                border-b last:border-0 border-gray-700
                flex justify-between items-center`}
            >
              <h3 className="mb-0">{space.name}</h3>
              <Button
                onClick={() => onSpaceOpen(space.id)}
                small
                label="Open Space"
              />
            </section>
          )
        })}
      </article>
      <CreateSpace
        isOpen={isCreateSpaceModalOpen}
        close={() => setIsCreateSpaceModalOpen(false)}
      />
    </div>
  )
}

export default Spaces

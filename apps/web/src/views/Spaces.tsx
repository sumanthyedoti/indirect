import { useState, FC } from 'react'

import { Button } from '../components/atoms'
import { useQueryUserSpaces } from '../queries'
import CreateSpace from '../components/SpacesBar/CreateSpace'
import { useUserStore } from '../store'

interface SpacesProps {
  dummy?: null
}

const Spaces: FC<SpacesProps> = () => {
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)
  const { user } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  if (!spaces) return null
  return (
    <div className="p-5 mx-auto sm:px-5 md:px-0 md:w-4/5 lg:w-3/5">
      <div className="flex flex-col justify-between mb-14 sm:flex-row sm:items-center">
        <h1 role="banner" className="text-4xl font-light text-white sm:mb-0">
          inDirect
        </h1>
        <Button
          onClick={() => setIsCreateSpaceModalOpen(true)}
          label="Create a new Space"
        />
      </div>
      <h1>Your Spaces</h1>
      <article className="rounded bg-slate-800">
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
              <Button small label="Open Space" />
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

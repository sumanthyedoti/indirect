import { useState, memo, FC } from 'react'

import { Button, LinkButton } from '../components/atoms'
import { Header } from '../components/molecules'
import { useQueryUserSpaces } from '../queries'
import CreateSpace from '../components/SpacesBar/CreateSpace'
import { useUserStore } from '../store'
import { useAuthPing } from '../hooks'

const SpaceItem = memo(({ id, name }: { id: number; name: string }) => {
  return (
    <section
      className={`
                px-6 py-4
                border-b last:border-0 border-gray-700
                flex justify-between items-center`}
    >
      <h3 className="mb-0">{name}</h3>
      <LinkButton to={id.toString()} small>
        Open Space
      </LinkButton>
    </section>
  )
})
SpaceItem.displayName = 'SpaceItem'

const Spaces: FC = () => {
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)
  const { user } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user.id)

  useAuthPing()

  if (!spaces) return null

  return (
    <>
      <Header />
      <main className="container-width">
        <div className="flex justify-between mb-6">
          <h1 className="mb-0">Your Spaces</h1>
          <Button
            onClick={() => setIsCreateSpaceModalOpen(true)}
            label="Create a new Space"
          />
        </div>
        <article className="py-2 rounded bg-slate-800 ring-4 ring-slate-600">
          {spaces.length === 0 && (
            <p className="px-6 py-10 text-2xl text-center text-gray-400 lg:px-10">
              You are not part of any space yet. <br /> You can create your own
              Space or join other Spaces
            </p>
          )}
          {spaces.map((space) => (
            <SpaceItem key={space.id} id={space.id} name={space.name} />
          ))}
        </article>
        <CreateSpace
          isOpen={isCreateSpaceModalOpen}
          close={() => setIsCreateSpaceModalOpen(false)}
        />
      </main>
    </>
  )
}

export default Spaces

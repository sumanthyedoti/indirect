import { useState, useEffect, memo, FC } from 'react'
import toast from 'react-hot-toast'

import { Button, LinkButton } from '../components/atoms'
import { useQueryUserSpaces } from '../queries'
import CreateSpace from '../components/SpacesBar/CreateSpace'
import { useUserStore } from '../store'
import { useSocket } from '../hooks'
import AvatarMenu from '../components/AvatarMenu'
import api from '../axios'

const SpaceItem = memo(({ id, name }: { id: number; name: string }) => {
  const socket = useSocket()
  useEffect(() => {
    socket.emit('join-space', id)
  }, [id])
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
  const { user, logout } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user.id)

  useEffect(() => {
    authPing()
  }, [])

  const authPing = async () => {
    try {
      await api.get(`/users/ping`)
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        logout()
      }
      toast.error('Session expired. Please login', {
        id: 'auth-error',
      })
    }
  }

  if (!spaces) return null

  return (
    <div className="p-5 mx-auto sm:px-5 md:px-0 md:w-4/5 lg:w-3/5">
      <div
        role="banner"
        className="flex flex-col justify-between sm:flex-row sm:items-center"
        style={{
          marginBottom: 'max(40px, 5vh)',
        }}
      >
        <h1 className="text-4xl font-light text-white sm:mb-0">inDirect</h1>
        <div className="w-10 h-10">
          <AvatarMenu />
        </div>
      </div>
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
    </div>
  )
}

export default Spaces

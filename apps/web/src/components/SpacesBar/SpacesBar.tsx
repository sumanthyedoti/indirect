import { useState, useCallback, FC } from 'react'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

import { Space as SpaceT, CreateSpace as CreateSpaceT } from '@api-types/spaces'
import { useQueryUserSpaces } from '../../queries'
import CreateSpace from './CreateSpace'
import Modal from '../Modal'
import { Space as SpaceIcon, Plus } from '../../icons'
import { IconButton } from '../atoms'
import { useUserStore } from '../../store'
import api from '../../axios'

interface SpacesBarProps {
  dummy?: null
}

const SpacesBar: FC<SpacesBarProps> = () => {
  const { user, spaceId, setSpaceId } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)

  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const onCreateNewSpace = useCallback(async (data: CreateSpaceT) => {
    try {
      const {
        data: { data: newSpace },
      } = await api.post<{ data: SpaceT }>('/spaces', data)
      toast.success('Space created', {
        id: 'post-space-success',
      })

      queryClient.setQueryData<SpaceT[] | undefined>(
        'spaces',
        //@ts-ignore
        (spaces) => {
          if (!spaces) return newSpace
          return [...spaces, newSpace]
        }
      )
      queryClient.invalidateQueries('spaces')
      setIsCreateSpaceModalOpen(false)
      setSpaceId(newSpace.id)
    } catch (err) {
      console.log(err)
      toast.error('Error creating Space', {
        id: 'post-spacel-error',
      })
    }
  }, [])

  console.log(spaces)

  return (
    <div className="flex flex-col items-center w-1/12 mt-3">
      {spaces?.map((space) => {
        return (
          <IconButton
            className={classnames(
              `rounded-2xl
              w-12 h-12 lg:w-14 lg:h-14
              bg-slate-800 mb-4`,
              {
                'ring-2 ring-slate-300 hover:ring-sky-400 hover:ring-2 focus:ring-sky-400 focus:ring-2':
                  space.id === spaceId,
                'focus:ring-1 focus:ring-sky-400': space.id !== spaceId,
                'hover:rounded-full focus:rounded-full': space.id !== spaceId,
              }
            )}
            onClick={() => setSpaceId(space.id)}
            key={space.id}
          >
            <>
              <SpaceIcon aria-label={space.name} />
            </>
          </IconButton>
        )
      })}
      <IconButton
        className={`
        mt-2
        flex justify-center items-center
        bg-slate-800 w-12 h-12 lg:w-14 lg:h-14
        rounded rounded-lg
        `}
        aril-lable="Create a new Space"
        onClick={() => setIsCreateSpaceModalOpen(true)}
      >
        <span className="w-8 h-8">
          <Plus />
        </span>
      </IconButton>
      <Modal
        isOpen={isCreateSpaceModalOpen}
        close={() => setIsCreateSpaceModalOpen(false)}
      >
        <CreateSpace
          createSpace={onCreateNewSpace}
          close={() => setIsCreateSpaceModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default SpacesBar

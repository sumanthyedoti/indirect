import { useState, FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'

import { useQueryUserSpaces } from '../../queries'
import CreateSpace from './CreateSpace'
import { Tooltip } from '../molecules'
import Loader from './Loader'
import { Space as SpaceIcon, Plus } from '../../icons'
import { useUserStore } from '../../store'

interface SpacesBarProps {
  dummy?: null
}

const SpacesBar: FC<SpacesBarProps> = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { user, spaceId } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)

  const onSpaceClick = (spaceId: number) => {
    if (params.spaceId) {
      if (parseInt(params.spaceId) !== spaceId) {
        navigate(spaceId.toString())
        navigate(`/${spaceId.toString()}`)
      }
    }
  }

  if (!spaces) return <Loader />

  return (
    <>
      {spaces?.map((space) => {
        return (
          <Tooltip
            key={space.id}
            placement="right"
            delay={100}
            label={space.name}
          >
            <button
              onClick={() => onSpaceClick(space.id)}
              className={classnames(
                `rounded-xl first:mt-1
                  w-12 h-12 lg:w-14 lg:h-14
                  bg-slate-900 mb-4 border border-slate-700`,
                {
                  'border-2 border-slate-400 focus:ring-2 focus:ring-sky-400':
                    space.id === spaceId,
                  'focus:ring-2 focus:ring-sky-400': space.id !== spaceId,
                }
              )}
              key={space.id}
            >
              <SpaceIcon aria-label={space.name} />
            </button>
          </Tooltip>
        )
      })}
      <Tooltip placement="right" label="Create a new Space">
        <button
          className={`
            mx-2 my-3
            flex justify-center items-center
            bg-slate-900 border border-slate-700
            w-12 h-12 lg:w-14 lg:h-14 shrink-0
            rounded rounded-lg
    `}
          aril-lable="Create a new Space"
          onClick={() => setIsCreateSpaceModalOpen(true)}
        >
          <span className="w-8 h-8">
            <Plus />
          </span>
        </button>
      </Tooltip>

      <CreateSpace
        isOpen={isCreateSpaceModalOpen}
        close={() => setIsCreateSpaceModalOpen(false)}
      />
    </>
  )
}

export default SpacesBar

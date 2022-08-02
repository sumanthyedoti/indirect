import { useState, FC } from 'react'
import classnames from 'classnames'
import Tippy from '@tippyjs/react'

import { useQueryUserSpaces } from '../../queries'
import CreateSpace from './CreateSpace'
import Modal from '../Modal'
import { Space as SpaceIcon, Plus } from '../../icons'
import { useUserStore } from '../../store'

interface SpacesBarProps {
  dummy?: null
}

interface ToolTipProps {
  children: JSX.Element
  label: string
  delay?: number
}
const Tooltip = ({ label, children, delay = 350 }: ToolTipProps) => {
  return (
    <Tippy
      arrow
      placement="right"
      theme="light"
      content={label}
      delay={delay}
      trigger="mouseenter"
    >
      {children}
    </Tippy>
  )
}

const SpacesBar: FC<SpacesBarProps> = () => {
  const { user, spaceId, setSpaceId } = useUserStore()
  const { data: spaces } = useQueryUserSpaces(user?.id)

  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)

  return (
    <aside className="flex flex-col items-center mt-3 w-28 lg:w-32">
      {spaces?.map((space) => {
        return (
          <Tooltip key={space.id} delay={100} label={space.name}>
            <button
              className={classnames(
                `rounded-2xl
                w-12 h-12 lg:w-14 lg:h-14
                bg-slate-800 mb-4`,
                {
                  'border-2 border-slate-300 focus:ring-2 focus:ring-sky-400 active:ring-2 active-sky-400':
                    space.id === spaceId,
                  'focus:ring-2 focus:ring-sky-400': space.id !== spaceId,
                }
              )}
              onClick={() => setSpaceId(space.id)}
              key={space.id}
            >
              <>
                <SpaceIcon aria-label={space.name} />
              </>
            </button>
          </Tooltip>
        )
      })}
      <Tooltip label="Create a new Space">
        <button
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
        </button>
      </Tooltip>

      <Modal
        isOpen={isCreateSpaceModalOpen}
        close={() => setIsCreateSpaceModalOpen(false)}
      >
        <CreateSpace close={() => setIsCreateSpaceModalOpen(false)} />
      </Modal>
    </aside>
  )
}

export default SpacesBar

import { FC } from 'react'
import { Popover } from '@headlessui/react'

import useUserStore from '../../store/useUserStore'
import { ChevronDown, LeaveSpace, AddPeople } from '../../icons'
import { useQuerySpace } from '../../queries'

const SideHeader: FC = () => {
  const { spaceId } = useUserStore()
  const { data: space, isSuccess } = useQuerySpace(spaceId)

  if (!isSuccess) return null
  return (
    <Popover className="relative">
      <Popover.Button
        className={`flex items-center space-x-1.5
        py-3 border-b border-gray-700 w-full
        focus:ring-0
        side-panel-item-padding hover:bg-slate-800
        shadow-sm shadow-gray-700`}
      >
        <h2 className="mb-0 text-base">{space.name}</h2>
        <span className="w-3.5 h-3.5">
          <ChevronDown />
        </span>
      </Popover.Button>
      <Popover.Panel
        className={`absolute right-0 left-1 z-10
            rounded-sm bg-slate-900
            ring ring-slate-700
            flex flex-col py-2
            `}
        style={{
          width: '98%',
        }}
      >
        <button
          className={`flex px-4 py-2 space-x-3 hover:bg-slate-800
          `}
        >
          <AddPeople />
          <span>Invite Poeple to the Space</span>
        </button>
        <button
          className={`flex px-4 py-2 text-red-500 space-x-3
          hover:bg-red-500 hover:text-current`}
        >
          <LeaveSpace />
          <span>Leave the Space</span>
        </button>
      </Popover.Panel>
    </Popover>
  )
}

export default SideHeader

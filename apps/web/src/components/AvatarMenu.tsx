import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { Popover } from '@headlessui/react'

import { Tooltip } from './molecules'
import { MenuButton } from './atoms'
import { Logout } from '../icons'
import Avatar from './atoms/Avatar'
import { useUserStore } from '../store'
import { useUserName } from '../hooks'
import api from '../axios'

interface AvatarMenuProps {
  spaceId?: number
  className?: null
}

const AvatarMenu: FC<AvatarMenuProps> = ({ spaceId }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { logout } = useUserStore()
  const name = useUserName(spaceId)
  const handleLogout = async () => {
    try {
      setIsProcessing(true)
      await api.delete('/logout')
      logout()
    } catch (err) {
      setIsProcessing(false)
      toast.error('Failed to logout. Please try again')
    }
  }
  if (!name) return null
  return (
    <Popover className="relative">
      <Tooltip label={name} arrow={false} placement="bottom">
        <Popover.Button className="ring-offset-1 ring-offset-slate-700">
          <div className="w-8 h-8">
            <Avatar spaceId={spaceId} />
          </div>
        </Popover.Button>
      </Tooltip>
      <Popover.Panel
        className={`absolute right-0 z-10
            rounded bg-slate-900
            ring ring-slate-700
            flex flex-col py-4
            `}
        style={{
          minWidth: '200px',
        }}
      >
        <div className="flex items-center px-4 pb-4 border-b border-gray-600 space-x-2">
          <div className="w-10 h-10">
            <Avatar />
          </div>
          <p>{name}</p>
        </div>
        <MenuButton
          onClick={handleLogout}
          aria-label="Log out"
          danger
          disabled={isProcessing}
          isLoading={isProcessing}
        >
          <Logout />
          <span>Logout</span>
        </MenuButton>
      </Popover.Panel>
    </Popover>
  )
}

export default AvatarMenu

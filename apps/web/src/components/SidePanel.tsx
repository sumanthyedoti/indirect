import { useQueryClient } from 'react-query'
import classnames from 'classnames'
import { FC, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

import userStore from '../store/userStore'
import { Logout } from '../icons'
import { Modal, CreateChannel } from './organisms'
import { IconButton } from './atoms'
import { Plus } from '../icons'
import { useQueryChannels } from '../queries'
import { CreateChannel as CreateChannelT } from '@api-types/channels'
import { appErrorToastOptions, successToastOptions } from '../utils'
import api from '../axios'
import { userErrorToastOptions } from '../utils'

interface SidePanelProps {
  dummy?: null
}

const SidePanel: FC<SidePanelProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  const queryClient = useQueryClient()
  const { spaceId, channelId, setChannelId, logout } = userStore()
  const { data: channels, isSuccess } = useQueryChannels(spaceId)
  const createChannel = useCallback(async (data: CreateChannelT) => {
    try {
      const { data: res } = await api.post('/channels', data)
      closeModal()
      toast.success('Channel created', {
        ...successToastOptions,
        id: 'post-channel-success',
      })
      setChannelId(res.data.id)
      queryClient.invalidateQueries(['channels', spaceId])
    } catch (err) {
      console.log(err)
      toast.error('Error creating Channel', {
        ...appErrorToastOptions,
        id: 'post-channel-error',
      })
    }
  }, [])
  const handleChannelClick = (id: number) => {
    setChannelId(id)
  }
  const handleLogout = async () => {
    try {
      await api.delete('/logout')
      logout()
    } catch (err) {
      toast.error('Failed to logout. Please try again', userErrorToastOptions)
    }
  }
  if (!isSuccess) return null

  return (
    <aside
      className={`w-1/3 md:w-1/4 xl:w-1/5 h-full relative
      px-2 py-2 md:px-3 border-r border-neutral-600
      bg-slate-900
     `}
    >
      <div className="flex items-center justify-between">
        <h4>Channels</h4>
        <IconButton aria-label="Create Channel" onClick={openModal}>
          <Plus />
        </IconButton>
      </div>
      {channels?.map((c) => {
        return (
          <button
            onClick={() => handleChannelClick(c.id)}
            key={c.id}
            className={classnames('flex space-x-1', [
              c.id === channelId && 'text-neutral-100',
            ])}
          >
            <span
              className={classnames('text-lg', {
                'text-zinc-400': c.id !== channelId,
              })}
            >
              #
            </span>
            <span className={classnames({ 'font-bold': c.id === channelId })}>
              {c.name}
            </span>
          </button>
        )
      })}
      <IconButton
        onClick={handleLogout}
        className="absolute bottom-2 right-2"
        aria-label="Log out"
      >
        <Logout />
      </IconButton>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <CreateChannel createChannel={createChannel} close={closeModal} />
      </Modal>
    </aside>
  )
}

export default SidePanel

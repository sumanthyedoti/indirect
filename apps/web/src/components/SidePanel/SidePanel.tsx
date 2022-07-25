import { useQueryClient } from 'react-query'
import classnames from 'classnames'
import { FC, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

import SideHeader from './SideHeader'
import CreateChannel from './CreateChannel'
import { CreateChannel as CreateChannelT } from '@api-types/channels'
import { Modal } from '../organisms'
import { IconButton } from '../atoms'
import userStore from '../../store/userStore'
import { Logout } from '../../icons'
import { Plus } from '../../icons'
import { useQuerySpaceChannels } from '../../queries'
import { appErrorToastOptions, successToastOptions } from '../../utils'
import api from '../../axios'
import { userErrorToastOptions } from '../../utils'

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
  const { data: channels, isSuccess } = useQuerySpaceChannels(spaceId)
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
      className={`
      w-1/3 lg:w-1/4 2xl:w-1/5 h-full
      shrink-0 relative
      border-r border-neutral-600
      bg-slate-900
     `}
    >
      <SideHeader />
      <div className="side-panel-padding">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-normal">Channels</h4>
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
      </div>
      <IconButton
        onClick={handleLogout}
        className="absolute bottom-3 right-3"
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

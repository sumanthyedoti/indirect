import { useQueryClient } from 'react-query'
import { FC, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

import userStore from '../store/userStore'
import { Modal, CreateChannel } from './organisms'
import { Plus } from '../icons'
import { useQueryChannels } from '../queries'
import { CreateChannel as CreateChannelT } from '@api-types/channels'
import { appErrorToastOptions, successToastOptions } from '../utils'
import api from '../axios'

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
  const { spaceId, channelId, setChannelId } = userStore()
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
  if (!isSuccess) return null

  return (
    <aside
      className={`w-1/4 md:w-1/5 h-full
      px-2 py-2 md:px-3 border-r border-neutral-600
      bg-slate-900
     `}
    >
      <div className="flex items-center justify-between">
        <h4>Channels</h4>
        <button aria-label="Create Channel" onClick={openModal}>
          <Plus />
        </button>
      </div>
      {channels?.map((c) => {
        return (
          <button
            onClick={() => handleChannelClick(c.id)}
            key={c.id}
            className="flex space-x-1"
          >
            <span className="text-lg text-zinc-400">#</span>
            <span className={channelId === c.id ? 'font-bold' : ''}>
              {c.name}
            </span>
          </button>
        )
      })}
      <Modal isOpen={isModalOpen} close={closeModal}>
        <CreateChannel createChannel={createChannel} close={closeModal} />
      </Modal>
    </aside>
  )
}

export default SidePanel

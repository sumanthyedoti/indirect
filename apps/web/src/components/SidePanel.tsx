import { FC, useState } from 'react'
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
  const { spaceId } = userStore()
  const { data: channels, isSuccess } = useQueryChannels(spaceId)
  const createChannel = async (data: CreateChannelT) => {
    try {
      await api.post('/channels', data)
      closeModal()
      toast.success('Channel created', {
        ...successToastOptions,
        id: 'post-channel-success',
      })
    } catch (err) {
      console.log(err)
      toast.error('Error creating Channel', {
        ...appErrorToastOptions,
        id: 'post-channel-error',
      })
    }
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
          <p key={c.id}>
            <span className="text-zinc-400"># </span>
            {c.name}
          </p>
        )
      })}
      <Modal isOpen={isModalOpen} close={closeModal}>
        <CreateChannel createChannel={createChannel} close={closeModal} />
      </Modal>
    </aside>
  )
}

export default SidePanel

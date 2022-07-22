import { FC, useState } from 'react'

// import api from '../axios'
import userStore from '../store/userStore'
import { Modal } from './organisms'
import { Plus } from '../icons'
import { Dialog } from '@headlessui/react'
import { useQueryChannels } from '../queries'

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
          <span key={c.id}>
            <span className="text-neutral-400"># </span>
            {c.name}
          </span>
        )
      })}
      <Modal isOpen={isModalOpen} close={closeModal}>
        <Dialog.Title as="h2" className="test">
          Create Channel
        </Dialog.Title>
        <button onClick={closeModal}>close</button>
      </Modal>
    </aside>
  )
}

export default SidePanel

import { useState, FC } from 'react'

import userStore from '../../store/userStore'
import Modal from '../Modal'
import { ChevronDown } from '../../icons'
import { useQueryChannel } from '../../queries'

import ChannelDetails from './ChannelDetails'

const SideHeader: FC = () => {
  const { channelId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }
  if (!isSuccess) return null
  return (
    <div className="mb-0 text-base border-b border-gray-700 shadow-sm shadow-gray-700 side-panel-padding">
      <button onClick={openModal} className="flex items-center space-x-1">
        <span># {channel.name} </span>
        <span className="w-3.5 h-3.5">
          <ChevronDown />
        </span>
      </button>
      <Modal className="-mt-48" isOpen={isModalOpen} close={closeModal}>
        <ChannelDetails close={closeModal} />
      </Modal>
    </div>
  )
}

export default SideHeader

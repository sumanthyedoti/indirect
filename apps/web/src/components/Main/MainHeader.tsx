import { FC } from 'react'

import userStore from '../../store/userStore'
import Modal from '../Modal'
import { ChevronDown } from '../../icons'
import { useQueryChannel } from '../../queries'

import ChannelDetails from './ChannelDetails'
import AddPeople from './AddPeople'
import useStore from './store'

const SideHeader: FC = () => {
  const { channelId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  const {
    isChannelModalOpen,
    isAddPeopleModalOpen,
    openChannelModal,
    closeChannelModal,
    closeAddPeopleModal,
  } = useStore()

  if (!isSuccess) return null
  return (
    <div className="mb-0 text-base border-b border-gray-700 shadow-sm shadow-gray-700 side-panel-padding">
      <button
        onClick={openChannelModal}
        className="flex items-center space-x-1"
      >
        <span># {channel.name} </span>
        <span className="w-3.5 h-3.5">
          <ChevronDown />
        </span>
      </button>
      <Modal
        className="-mt-48"
        isOpen={isChannelModalOpen}
        close={closeChannelModal}
      >
        <ChannelDetails />
      </Modal>
      <Modal
        className="-mt-48"
        isOpen={isAddPeopleModalOpen}
        close={closeAddPeopleModal}
      >
        <AddPeople />
      </Modal>
    </div>
  )
}

export default SideHeader

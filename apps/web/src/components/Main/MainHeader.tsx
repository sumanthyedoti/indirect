import { useCallback, FC } from 'react'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

import { Channel } from '@api-types/channels'
import userStore from '../../store/userStore'
import Modal from '../Modal'
import { ChevronDown } from '../../icons'
import { useQueryChannel } from '../../queries'
import ChannelDetails from './ChannelDetails'
import ConfirmationModal from '../ConfirmationModal'
import AddPeople from './AddPeople'
import useStore from './store'
import {
  appErrorToastOptions,
  successToastOptions,
} from '../../config/toastConfig'
import api from '../../axios'

const SideHeader: FC = () => {
  const { channelId, spaceId, setChannelId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  const queryClient = useQueryClient()
  const {
    isChannelModalOpen,
    isAddPeopleModalOpen,
    openChannelModal,
    closeChannelModal,
    closeAddPeopleModal,
  } = useStore()

  const onDeleteChannel = useCallback(async () => {
    try {
      await api.delete(`/channels/${channelId}`)
      toast.success('Channel deleted', {
        ...successToastOptions,
        id: 'delete-channel-success',
      })
      queryClient.setQueryData<Channel[] | undefined>(
        ['channels', spaceId],
        (oldData) => oldData?.filter((ch) => ch.id !== channelId)
      )
      queryClient.invalidateQueries(['channels', spaceId])

      setChannelId(1) // TODO: change to general channel of the space
    } catch (err) {
      console.log(err)
      toast.error('Error deleting Channel', {
        ...appErrorToastOptions,
        id: 'delete-channel-error',
      })
    }
  }, [])
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
      <ConfirmationModal
        description="Deleting the channel affects all the channel members"
        confirmLabel="Yes, Delete"
        onCancel={() => {
          openChannelModal()
        }}
        onConfirm={onDeleteChannel}
        isDanger={true}
      />
    </div>
  )
}

export default SideHeader

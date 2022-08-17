import { useCallback, FC } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Channel as ChannelT } from '@api-types/channels'
import { useUserStore, useSpaceStore } from '../../store'
import Modal from '../Modal'
import { ChevronDown } from '../../icons'
import { useQueryChannel } from '../../queries'
import ChannelDetails from './ChannelDetails'
import AvatarMenu from '../AvatarMenu'
import ConfirmationModal from '../ConfirmationModal'
import AddPeople from './AddPeople'
import useStore from './store'
import api from '../../axios'

const SideHeader: FC = () => {
  const { channelId, spaceId, user } = useUserStore()
  const { space } = useSpaceStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    isChannelModalOpen,
    isAddPeopleModalOpen,
    isConfirmationModalOpen,
    openChannelModal,
    closeChannelModal,
    closeAddPeopleModal,
    setActiveChannelTab,
    closeConfirmationModal,
  } = useStore()

  const onDeleteChannel = useCallback(async () => {
    try {
      await api.delete(`/channels/${channelId}`)
      toast.success('Channel deleted', {
        id: 'delete-channel-success',
      })
      queryClient.setQueryData<ChannelT[] | undefined>(
        ['channels', spaceId],
        (oldData) => oldData?.filter((ch) => ch.id !== channelId)
      )
      // set general channel id
      const channels = queryClient.getQueryData<ChannelT[]>([
        'channels',
        spaceId,
      ])
      const generalChannel = channels?.find(
        (c) => c.id === space?.general_channel_id
      )
      if (generalChannel) {
        navigate(`/${spaceId}/${generalChannel.id}`)
      } else {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      toast.error('Error deleting Channel', {
        id: 'delete-channel-error',
      })
    }
  }, [channelId, spaceId])

  if (!isSuccess || !user) return null

  return (
    <>
      <div
        className={`
          py-2 px-3 md:px-4 mb-0 text-base border-b border-gray-700
          shadow-sm shadow-gray-700
          flex justify-between items-center
        `}
      >
        <button
          onClick={openChannelModal}
          className="flex items-center space-x-1"
        >
          <span># {channel.name} </span>
          <span className="w-3.5 h-3.5">
            <ChevronDown />
          </span>
        </button>
        <AvatarMenu />
      </div>
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
        description={
          <span>
            Deleting the channel{' '}
            <span className="font-semibold">#{channel.name}</span>
          </span>
        }
        details="Deleting the channel affects all the channel members"
        confirmLabel="Yes, Delete"
        isOpen={isConfirmationModalOpen}
        close={() => closeConfirmationModal()}
        onConfirm={() => {
          setActiveChannelTab(0)
          onDeleteChannel()
        }}
        isDanger={true}
      />
    </>
  )
}

export default SideHeader

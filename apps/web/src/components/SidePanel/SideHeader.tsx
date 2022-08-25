import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { Popover } from '@headlessui/react'

import Modal from '../Modal'
import InvitePeople from './InvitePeople'
import useUserStore from '../../store/useUserStore'
import ConfirmationModal from '../ConfirmationModal'
import { ChevronDown, LeaveSpace, AddPeople } from '../../icons'
import { MenuButton } from '../atoms'
import { useQuerySpace } from '../../queries'
import useStore from './store'
import api from '../../axios'

const SideHeader: FC = () => {
  const {
    isLeaveConfirmModalOpen,
    isInvitePeopleModalOpen,
    openLeaveConfirmModal,
    closeLeaveConfirmModal,
    openInvitePeopleModal,
    closeInvitePeopleModal,
  } = useStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const { spaceId, user } = useUserStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: space, isSuccess } = useQuerySpace(spaceId)

  const onLeaveSpace = async () => {
    try {
      setIsProcessing(true)
      await api.delete(`/spaces/${spaceId}/users/${user.id}`)

      queryClient.setQueryData<number[] | undefined>(
        'spaces',
        //@ts-ignore
        (spaceIds) => spaceIds.filter((id) => id !== space?.id)
      )
      toast.success(`You left '${space?.name}'`)
      navigate('/')
    } catch (err) {
      setIsProcessing(false)
      console.log(err)
      toast.error('Something went wrong')
    }
  }

  if (!isSuccess) return null
  return (
    <Popover className="relative">
      <Popover.Button
        className={`flex items-center space-x-1.5
        py-3 border-b border-gray-700 w-full
        focus:ring-0
        side-panel-item-padding hover:bg-slate-800
        shadow-sm shadow-gray-700`}
      >
        <h2 className="mb-0 text-base">{space.name}</h2>
        <span className="w-3.5 h-3.5">
          <ChevronDown />
        </span>
      </Popover.Button>
      <Popover.Panel
        className={`absolute right-0 left-1 z-10
            rounded-sm bg-slate-900
            ring ring-slate-700
            flex flex-col py-2
            `}
        style={{
          width: '98%',
          minWidth: '16em',
        }}
      >
        <MenuButton onClick={openInvitePeopleModal}>
          <AddPeople />
          <span>Invite Poeple to the Space</span>
        </MenuButton>
        <MenuButton danger onClick={openLeaveConfirmModal}>
          <LeaveSpace />
          <span>Leave the Space</span>
        </MenuButton>
      </Popover.Panel>
      <ConfirmationModal
        isOpen={isLeaveConfirmModalOpen}
        close={closeLeaveConfirmModal}
        description={
          <>
            Leaving the <span className="font-semibold">{space.name}</span>
          </>
        }
        details="You are about to leave the space. Are you sure?"
        confirmLabel="Yes, Leave"
        onConfirm={() => {
          onLeaveSpace()
        }}
        isLoading={isProcessing}
        isDanger={true}
      />
      <Modal
        className="-mt-48"
        isOpen={isInvitePeopleModalOpen}
        close={closeInvitePeopleModal}
      >
        <InvitePeople />
      </Modal>
    </Popover>
  )
}

export default SideHeader

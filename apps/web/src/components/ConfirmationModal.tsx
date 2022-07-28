import { FC } from 'react'
import classnames from 'classnames'
import { Dialog } from '@headlessui/react'

import { Button } from './atoms'
import Modal from './Modal'
import useUIStore from '../store/useUIStore'

interface Props {
  title?: string
  description: string
  confirmLabel: string
  isDanger: boolean
  onCancel: () => void
  onConfirm: () => void
}

const DeleteChannelConfirmModal: FC<Props> = ({
  title = 'Are you sure?',
  description,
  confirmLabel,
  isDanger,
  onCancel,
  onConfirm,
}) => {
  const { isConfirmationModalOpen, closeConfirmationModal } = useUIStore()
  const handleCancel = () => {
    closeConfirmationModal()
    onCancel()
  }
  const handleConfirm = () => {
    closeConfirmationModal()
    onConfirm()
  }

  return (
    <Modal
      className="-mt-48"
      isOpen={isConfirmationModalOpen}
      close={handleCancel}
    >
      <Dialog.Panel
        className={`w-full max-w-lg p-4 relative
        text-left align-middle
        bg-slate-700 transform
        rounded-md transition-all`}
      >
        <Dialog.Title as="h2" className="px-4">
          {title}
        </Dialog.Title>
        <Dialog.Description as="p" className="px-4">
          {description}
        </Dialog.Description>

        <div className="flex space-x-2">
          <Button
            secondary
            className="w-full mt-5"
            label="Cancel"
            onClick={handleCancel}
          />
          <Button
            onClick={handleConfirm}
            className={classnames('w-full mt-5', { 'bg-red-500': isDanger })}
            label={confirmLabel}
          />
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default DeleteChannelConfirmModal

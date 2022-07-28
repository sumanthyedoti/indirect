import React, { FC } from 'react'
import classnames from 'classnames'
import { Dialog } from '@headlessui/react'

import { Button } from './atoms'
import Modal from './Modal'
import useUIStore from '../store/useUIStore'

interface Props {
  title?: string
  description: React.ReactNode
  details?: React.ReactNode
  confirmLabel: string
  isDanger: boolean
  onCancel: () => void
  onConfirm: () => void
}

const DeleteChannelConfirmModal: FC<Props> = ({
  title = 'Are you sure?',
  description,
  details,
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
        className={`w-full max-w-lg relative
        text-left align-middle p-5
        bg-slate-700 transform
        rounded-md transition-all`}
      >
        <Dialog.Title as="h2" className="mb-1">
          {title}
        </Dialog.Title>
        <Dialog.Description as="p" className="mb-3">
          {description}
        </Dialog.Description>
        {details && <p className="text-sm">{details}</p>}

        <div className="flex mt-6 space-x-2">
          <Button
            secondary
            className="w-full"
            label="Cancel"
            onClick={handleCancel}
          />
          <Button
            onClick={handleConfirm}
            className={classnames('w-full', { 'bg-red-500': isDanger })}
            label={confirmLabel}
          />
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default DeleteChannelConfirmModal

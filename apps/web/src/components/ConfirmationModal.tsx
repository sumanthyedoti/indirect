import React, { FC } from 'react'
import { Dialog } from '@headlessui/react'

import { Button } from './atoms'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  close: () => void
  title?: string
  isLoading?: boolean
  description: React.ReactNode
  details?: React.ReactNode
  confirmLabel: string
  isDanger: boolean
  onConfirm: () => void
}

const DeleteChannelConfirmModal: FC<Props> = ({
  isOpen,
  close,
  title = 'Are you sure?',
  description,
  details,
  confirmLabel,
  isLoading,
  isDanger,
  onConfirm,
}) => {
  const handleConfirm = () => {
    close()
    onConfirm()
  }

  return (
    <Modal className="-mt-48" isOpen={isOpen} close={close}>
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
          <Button secondary className="w-full" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            danger={isDanger}
            className="w-full"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default DeleteChannelConfirmModal

import React, { FC, Fragment } from 'react'
import classnames from 'classnames'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  children: React.ReactNode
  initialFocusRef?: React.MutableRefObject<null>
  className?: string
  isOpen: boolean
  close: () => void
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  close,
  className,
  initialFocusRef,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={close}
        initialFocus={initialFocusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-25"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-25"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-25 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-25 scale-95"
            >
              <Dialog.Panel
                className={classnames([
                  'w-full max-w-lg overflow-hidden text-left align-middle shadow-xl shadow-lg bg-slate-700 transform rounded-md transition-all',
                  className,
                ])}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal

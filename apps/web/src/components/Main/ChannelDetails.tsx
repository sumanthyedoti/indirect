import React, { FC } from 'react'
import classnames from 'classnames'
import { Dialog, Tab } from '@headlessui/react'

import userStore from '../../store/userStore'
import { useQueryChannel } from '../../queries'
import { AddPeople, Close } from '../../icons'
import { IconButton } from '../atoms'
import useStore from './store'

interface ChannelDetailsProps {
  isPersonal?: boolean
}

interface SectionProps {
  children: React.ReactNode
}
const Section: FC<SectionProps> = ({ children }) => (
  <div className="px-4 py-2 border-b border-gray-600">{children}</div>
)

const AddPeopleButton = () => {
  const { openAddPeopleModal, closeChannelModal } = useStore()
  const handleAddPeopeClick = () => {
    closeChannelModal()
    openAddPeopleModal()
  }
  return (
    <button
      className={`flex items-center w-full
      p-3 rounded hover:bg-gray-800
      space-x-2 font-lg
      focus:bg-gray-800
      `}
      onClick={handleAddPeopeClick}
    >
      <span className="w-5 h-5">
        <AddPeople />
      </span>
      <span>App People</span>
    </button>
  )
}

const TabC: FC<{ children: string }> = ({ children }) => (
  <Tab
    className={({ selected }) =>
      classnames(
        'mx-3 first:ml-0 border-b-2 outline-none p-0.5 ring-offset-0',
        {
          'border-slate-300': selected,
          'border-transparent': !selected,
        }
      )
    }
  >
    {children}
  </Tab>
)

const ChannelDetailsModal: FC<ChannelDetailsProps> = () => {
  const { channelId } = userStore()
  const { closeChannelModal, activeChannelTab } = useStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)

  if (!isSuccess) return null
  return (
    <Dialog.Panel
      className={`w-full max-w-lg py-3 relative
        text-left align-middle
        bg-slate-700 transform
        rounded-md transition-all`}
      style={{
        minHeight: '300px',
      }}
    >
      <Dialog.Title as="h2" className="px-4">
        # {channel?.name}
      </Dialog.Title>
      <Tab.Group selectedIndex={activeChannelTab}>
        <Tab.List className="px-4 border-b border-gray-600">
          <TabC>About</TabC>
          <TabC>Members</TabC>
        </Tab.List>
        <Tab.Panels className="">
          <Tab.Panel tabIndex={-1}>
            {channel.description && (
              <Section>
                <h5 className="font-medium">Description</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: channel.description }}
                />
              </Section>
            )}
            <Section>
              <AddPeopleButton />
            </Section>
          </Tab.Panel>
          <Tab.Panel tabIndex={-1}>
            <Section>
              <AddPeopleButton />
            </Section>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <IconButton
        aria-label="Close"
        onClick={closeChannelModal}
        className="absolute top-4 right-4"
      >
        <Close />
      </IconButton>
    </Dialog.Panel>
  )
}

export default ChannelDetailsModal

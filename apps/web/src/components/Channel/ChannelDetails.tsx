import React, { FC } from 'react'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { Dialog, Tab } from '@headlessui/react'

import { useUserStore, useSpaceStore } from '../../store'
import {
  useQueryChannel,
  useQueryChannelMembers,
  useQuerySpaceUsers,
  useRemoveChannelMember,
} from '../../queries'
import { AddPeople, Close } from '../../icons'
import useStore from './store'
import useUIStore from '../../store/useUIStore'

interface SectionProps {
  children: React.ReactNode
  noBorder?: boolean
}

const Section: FC<SectionProps> = ({ children, noBorder }) => (
  <div
    className={classnames('px-4 py-2 border-gray-600', {
      'border-b': !noBorder,
    })}
  >
    {children}
  </div>
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
      py-3 px-2 rounded hover:bg-gray-800
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

const DeleteChannelButton = () => {
  const { openConfirmationModal } = useUIStore()
  const { closeChannelModal } = useStore()
  const deleteChannelConfirmation = () => {
    closeChannelModal()
    openConfirmationModal()
  }
  return (
    <button
      className={`flex items-center w-full
      py-3 px-2 rounded hover:bg-slate-600
      space-x-2 font-lg
      focus:bg-slate-600 text-red-500 ring-offset-slate-700
      `}
      onClick={deleteChannelConfirmation}
    >
      Delete the Channel
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

interface ChannelDetailsProps {
  isPersonal?: boolean
}
const ChannelDetailsModal: FC<ChannelDetailsProps> = () => {
  const { channelId, spaceId } = useUserStore()
  const { space } = useSpaceStore()
  const { closeChannelModal, activeChannelTab, setActiveChannelTab } =
    useStore()
  const { data: users } = useQuerySpaceUsers(spaceId)
  const { data: channel } = useQueryChannel(channelId)
  const { data: channelUserIds } = useQueryChannelMembers(channelId)
  const { mutate: removeMember } = useRemoveChannelMember(channelId)

  const handleRemoveMember = (id: number) => {
    removeMember(id)
  }
  if (!users || !channel || !channelUserIds) return null

  const renderRemoveMemeberButton = (uid: number) => {
    if (channel.id === space?.general_channel_id) return null
    if (channel.creator_id === uid) {
      return <i className="text-sm text-slate-400">Created the channel</i>
    }
    return (
      <button
        className="text-sm text-sky-500 hover:text-red-500"
        onClick={() => handleRemoveMember(uid)}
      >
        Remove
      </button>
    )
  }

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
      <Tab.Group
        selectedIndex={activeChannelTab}
        onChange={setActiveChannelTab}
      >
        <Tab.List className="px-4 border-b border-gray-600">
          <TabC>About</TabC>
          <TabC>Members</TabC>
          <TabC>Settings</TabC>
        </Tab.List>
        <Tab.Panels className="">
          {/* About */}
          <Tab.Panel tabIndex={-1}>
            {channel.description && (
              <Section>
                <h5 className="font-medium">Description</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: channel.description }}
                />
              </Section>
            )}
            {channel.id !== space?.general_channel_id && (
              <Section>
                <h5 className="font-medium">Created by</h5>
                <div>
                  <span className="font-medium">
                    {users.idMap[channel.creator_id].fullname}
                  </span>{' '}
                  on {dayjs(channel.created_at).format('MMM D, YYYY')}
                </div>
              </Section>
            )}
            {channel.id !== space?.general_channel_id && (
              <Section>
                <AddPeopleButton />
              </Section>
            )}
          </Tab.Panel>
          {/* Members */}
          <Tab.Panel tabIndex={-1}>
            <Section>
              {channel.id !== space?.general_channel_id && <AddPeopleButton />}
              <ul>
                {channelUserIds?.map((uid) => {
                  const user = users.idMap[uid]

                  return (
                    <li
                      className="p-2 hover:bg-slate-600 flex-between-center"
                      key={uid}
                    >
                      <span>{user ? user.fullname : 'Unknown User'}</span>
                      {renderRemoveMemeberButton(uid)}
                    </li>
                  )
                })}
              </ul>
            </Section>
          </Tab.Panel>
          {/* Settings */}
          <Tab.Panel tabIndex={-1}>
            {!(channel.id === space?.general_channel_id) && (
              <Section>
                <DeleteChannelButton />
              </Section>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <button
        aria-label="Close"
        onClick={() => {
          setActiveChannelTab(0)
          closeChannelModal()
        }}
        className="absolute icon top-4 right-4"
      >
        <Close />
      </button>
    </Dialog.Panel>
  )
}

export default ChannelDetailsModal

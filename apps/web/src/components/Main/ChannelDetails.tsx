import React, { FC } from 'react'
import classnames from 'classnames'
import { Dialog, Tab } from '@headlessui/react'

import userStore from '../../store/userStore'
import { useQueryChannel } from '../../queries'
import { AddPeople } from '../../icons'

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
  return (
    <button
      className={`flex items-center w-full
      p-3 rounded hover:bg-gray-800
      space-x-2 font-lg
      focus:bg-gray-800
      `}
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
        'mx-3 first:ml-0 border-b-2 outline-none ring-offset-0 focus:ring-0',
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

const ChannelDetails: FC<ChannelDetailsProps> = () => {
  const { channelId } = userStore()
  const { data: channel, isSuccess } = useQueryChannel(channelId)
  if (!isSuccess) return null
  return (
    <div>
      <Dialog.Panel
        className={`w-full max-w-lg py-3
        text-left align-middle
        bg-slate-700 transform
        rounded-md transition-all`}
        style={{
          minHeight: '200px',
        }}
      >
        <Dialog.Title as="h2" className="px-4 pb-2 mb-0">
          # {channel?.name}
        </Dialog.Title>
        <Tab.Group>
          <Tab.List className="px-4 border-b border-gray-600">
            <TabC>About</TabC>
            <TabC>Members</TabC>
          </Tab.List>
          <Tab.Panels className="">
            <Tab.Panel className="flex flex-col">
              {channel.description && (
                <Section>
                  <h5 className="font-medium">Description</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: channel.description }}
                  />
                </Section>
              )}
            </Tab.Panel>
            <Tab.Panel>
              <Section>
                <AddPeopleButton />
              </Section>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Dialog.Panel>
    </div>
  )
}

export default ChannelDetails

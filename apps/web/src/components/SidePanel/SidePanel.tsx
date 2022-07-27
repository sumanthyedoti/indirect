import React, { FC, useState, useCallback } from 'react'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

import SideHeader from './SideHeader'
import ChannelName from './ChannelName'
import Section from './Section'
import CreateChannel from './CreateChannel'
import { CreateChannel as CreateChannelT } from '@api-types/channels'
import Modal from '../Modal'
import { IconButton } from '../atoms'
import userStore from '../../store/userStore'
import { Logout, Plus } from '../../icons'
import { useQuerySpaceChannels } from '../../queries'
import { appErrorToastOptions, successToastOptions } from '../../utils'
import api from '../../axios'
import { userErrorToastOptions } from '../../utils'

const SidePanel: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }
  const queryClient = useQueryClient()
  const { spaceId, setChannelId, logout } = userStore()
  const { data: channels, isSuccess } = useQuerySpaceChannels(spaceId)

  const createChannel = useCallback(async (data: CreateChannelT) => {
    try {
      const { data: res } = await api.post('/channels', data)
      closeModal()
      toast.success('Channel created', {
        ...successToastOptions,
        id: 'post-channel-success',
      })
      console.log(res)
      queryClient.setQueryData(['channels', spaceId], (oldData) => [
        //@ts-ignore
        ...oldData,
        {
          id: res.data.id,
          ...data,
        },
      ])
      // queryClient.invalidateQueries(['channels', spaceId])

      setChannelId(res.data.id)
    } catch (err) {
      console.log(err)
      toast.error('Error creating Channel', {
        ...appErrorToastOptions,
        id: 'post-channel-error',
      })
    }
  }, [])

  const handleChannelClick = (id: number) => {
    setChannelId(id)
  }
  const handleLogout = async () => {
    try {
      await api.delete('/logout')
      logout()
    } catch (err) {
      toast.error('Failed to logout. Please try again', userErrorToastOptions)
    }
  }
  if (!isSuccess) return null

  return (
    <aside
      className={`
      w-1/3 lg:w-1/4 2xl:w-1/5 h-full
      shrink-0 relative
      border-r border-neutral-600
      bg-slate-900
     `}
    >
      <SideHeader />
      <div className="side-panel-padding">
        <Section
          title="Channels"
          actionIcon={
            <IconButton
              className="w-5 h-5"
              aria-label="Create Channel"
              onClick={openModal}
            >
              <Plus />
            </IconButton>
          }
          body={
            <>
              {channels?.map((c) => {
                return (
                  <ChannelName
                    key={c.id}
                    channel={c}
                    onClick={handleChannelClick}
                  />
                )
              })}
            </>
          }
        />
      </div>
      <IconButton
        onClick={handleLogout}
        className="absolute bottom-3 right-3"
        aria-label="Log out"
      >
        <Logout />
      </IconButton>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <CreateChannel createChannel={createChannel} close={closeModal} />
      </Modal>
    </aside>
  )
}

export default SidePanel

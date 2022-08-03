import React, { FC, useEffect, useState, useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import SideHeader from './SideHeader'
import ChannelName from './ChannelName'
import Section from './Section'
import CreateChannel from './CreateChannel'
import {
  CreateChannel as CreateChannelT,
  Channel as ChannelT,
} from '@api-types/channels'
import Modal from '../Modal'
import { IconButton } from '../atoms'
import useUserStore from '../../store/useUserStore'
import { Logout, Plus } from '../../icons'
import { useQuerySpaceChannels } from '../../queries'
import api from '../../axios'

const SidePanel: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }
  const queryClient = useQueryClient()
  const { spaceId, setChannelId, logout } = useUserStore()
  const { data: channels, isSuccess } = useQuerySpaceChannels(spaceId)

  useEffect(() => {
    /* set channel ID from URL param */
    if (params.channelId && params.spaceId) {
      const paramSpaceId = parseInt(params.spaceId)
      const channelId = parseInt(params.channelId)
      const channels = queryClient.getQueryData<ChannelT[]>([
        'channels',
        paramSpaceId,
      ])
      const channel = channels?.find(
        (c) => c.space_id === paramSpaceId && c.id === channelId
      )
      // set channel ID if channel exists
      if (channel) {
        setChannelId(channel.id)
      } else {
        // else redirect to general channel of the Space
        const generalChannel = channels?.find((c) => c.is_general)
        if (generalChannel) {
          navigate(`./${generalChannel.id}`, { replace: true })
        } else {
          navigate('/')
        }
      }
    }
  }, [params.channelId])

  const createChannel = useCallback(
    async (data: CreateChannelT) => {
      try {
        const {
          data: { data: newChannel },
        } = await api.post<{ data: ChannelT }>('/channels', data)
        closeModal()
        toast.success('Channel created', {
          id: 'post-channel-success',
        })

        queryClient.setQueryData<ChannelT[] | undefined>(
          ['channels', spaceId],
          //@ts-ignore
          (channels) => {
            if (!channels) return newChannel
            return [...channels, newChannel]
          }
        )
        setIsModalOpen(false)
        navigate(`/${spaceId}/${newChannel.id}`)
      } catch (err) {
        console.log(err)
        toast.error('Error creating Channel', {
          id: 'post-channel-error',
        })
      }
    },
    [spaceId]
  )

  const handleChannelClick = (id: number) => {
    navigate(`./${id}`)
  }
  const handleLogout = async () => {
    try {
      await api.delete('/logout')
      logout()
    } catch (err) {
      toast.error('Failed to logout. Please try again')
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
      <div className="">
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

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
import { useUserStore, useSpaceStore } from '../../store'
import { Plus } from '../../icons'
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
  const { spaceId, setChannelId } = useUserStore()
  const { space } = useSpaceStore()
  const { data: channels, isError } = useQuerySpaceChannels(spaceId)

  useEffect(() => {
    if (isError) {
      navigate('/')
      toast.error('Error while loading data!')
    }
    /* set channel ID from URL param */
    if (!params.channelId || !params.spaceId || !channels || !space) {
      return
    }
    const paramSpaceId = parseInt(params.spaceId)
    const channelId = parseInt(params.channelId)
    // const channels = queryClient.getQueryData<ChannelT[]>([
    //   'channels',
    //   paramSpaceId,
    // ])
    console.log(channelId)
    console.log(channels)
    const channel = channels?.find(
      (c) => c.space_id === paramSpaceId && c.id === channelId
    )
    // redirect to general channel of the Space if the channel does not exists
    if (!channel) {
      setChannelId(space.general_channel_id)
      navigate(`/${space.id}/${space.general_channel_id}`, { replace: true })
      return
    }
    // set channel ID if channel exists
    setChannelId(channel.id)
  }, [params.channelId, channels, isError])

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
  if (!channels) return null

  return (
    <aside
      className={`
      w-1/3 lg:w-1/4 2xl:w-1/5 h-full
      shrink-0
      border-r border-neutral-600
      bg-slate-900
     `}
    >
      <SideHeader />
      <div className="">
        <Section
          title="Channels"
          actionIcon={
            <button
              className="w-5 h-5 icon"
              aria-label="Create Channel"
              onClick={openModal}
            >
              <Plus />
            </button>
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
      <Modal isOpen={isModalOpen} close={closeModal}>
        <CreateChannel createChannel={createChannel} close={closeModal} />
      </Modal>
    </aside>
  )
}

export default SidePanel

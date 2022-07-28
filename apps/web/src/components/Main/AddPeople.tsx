import React, { useState, FC } from 'react'
import toast from 'react-hot-toast'
import Select, { components, OptionProps } from 'react-select'
import { useQueryClient } from 'react-query'
import { Dialog } from '@headlessui/react'

import { ChannelMembers } from '@api-types/channels'
import useUserStore from '../../store/useUserStore'
import {
  useQuerySpaceUsers,
  useQueryChannel,
  useQueryChannelMembers,
} from '../../queries'
import { IconButton, Button } from '../atoms'
import { Close, ArrowBack } from '../../icons'
import useStore from './store'
import stylesConfig from '../../config/react-select-styles'
import api from '../../axios'

interface AddPeoleProps {
  dummy?: null
}
type OptionT = {
  value: number
  label: string
  isDisabled: boolean
}

const AddPeole: FC<AddPeoleProps> = () => {
  const [selectedUsers, setSelectedUsers] = useState<OptionT[]>([])
  const [isError, setIsError] = useState(false)
  const queryClient = useQueryClient()
  const { spaceId, channelId } = useUserStore()
  const { closeAddPeopleModal, openChannelModal } = useStore()
  const { data: users } = useQuerySpaceUsers(spaceId)
  const { data: channel } = useQueryChannel(channelId)
  const { data: channelUserIds } = useQueryChannelMembers(channelId)
  if (!users || !channel || !channelUserIds) return null
  const options: OptionT[] = users?.list.map((user) => {
    const isAlreadyAMember = !channelUserIds.every((id) => id !== user.user_id)
    return {
      value: user.user_id,
      label: user.fullname,
      isDisabled: isAlreadyAMember,
    }
  })

  const handleGoBack = () => {
    openChannelModal()
    closeAddPeopleModal()
  }
  const onPeopleChange = (data: any) => {
    if (data.length) setIsError(false)
    setSelectedUsers(data)
  }
  const onAddPeople = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedUsers.length === 0) {
      setIsError(true)
      return
    }
    try {
      const userIds = selectedUsers.map((u) => u.value)
      await api.post(`/channels/${channelId}/users`, {
        user_ids: userIds,
      })
      toast.success(`Added users to the channel '#${channel.name}'`, {
        id: 'post-channel-users-success',
      })
      queryClient.setQueryData<ChannelMembers>(
        ['channel-users', channelId],
        (oldData) => {
          if (!oldData) return userIds
          return [...oldData, ...userIds]
        }
      )
      setSelectedUsers([])
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong while adding users to the channel', {
        id: 'post-channel-users-error',
      })
    }
  }

  const Option = (props: OptionProps) => {
    return (
      <div className="flex items-center justify-between">
        <components.Option {...props} />
        {props.isDisabled && (
          <i className="mr-4 text-xs shrink-0">alredy a member</i>
        )}
      </div>
    )
  }

  return (
    <Dialog.Panel
      className="relative z-10 p-5"
      style={{
        minHeight: '200px',
      }}
    >
      <div className="flex items-center space-x-2">
        <IconButton
          aria-label="Go back to channel members"
          onClick={handleGoBack}
          className="h-8 w-9"
        >
          <ArrowBack />
        </IconButton>
        <Dialog.Title as="h2" className="mb-0">
          Add People
        </Dialog.Title>
      </div>
      <p className="self-end mb-4 ml-10"># {channel.name}</p>
      <form className="" onSubmit={onAddPeople}>
        <Select
          components={{ Option }}
          styles={stylesConfig}
          options={options}
          isMulti
          value={selectedUsers}
          onChange={onPeopleChange}
          noOptionsMessage={() => 'No matches'}
          menuPortalTarget={document.body}
        />
        {isError && (
          <em className="text-sm text-red-400">No poeple are selected</em>
        )}
        <Button
          type="submit"
          className="w-full mt-6"
          label="Add to the Channel"
        />
      </form>
      <IconButton
        aria-label="Close"
        onClick={closeAddPeopleModal}
        className="absolute top-6 right-4"
      >
        <Close />
      </IconButton>
    </Dialog.Panel>
  )
}

export default AddPeole

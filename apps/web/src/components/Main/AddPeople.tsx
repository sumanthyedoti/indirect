import React, { useState, FC } from 'react'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Dialog } from '@headlessui/react'

import userStore from '../../store/userStore'
import { useQueryUsers, useQueryChannel } from '../../queries'
import { IconButton, Button } from '../atoms'
import { Close, ArrowBack } from '../../icons'
import useStore from './store'
import stylesConfig from '../../config/react-select-styles'
import { appErrorToastOptions, successToastOptions } from '../../utils'
import api from '../../axios'

interface AddPeoleProps {
  dummy?: null
}
type OptionT = {
  value: number
  label: string
}

const AddPeole: FC<AddPeoleProps> = () => {
  const [selectedUsers, setSelectedUsers] = useState<OptionT[]>([])
  const [isError, setIsError] = useState(false)
  const { spaceId, channelId } = userStore()
  const { closeAddPeopleModal, openChannelModal } = useStore()
  const { data } = useQueryUsers(spaceId)
  const { data: channel } = useQueryChannel(channelId)
  if (!data || !channel) return null
  const options: OptionT[] = data?.list.map((user) => ({
    value: user.user_id,
    label: user.fullname,
  }))

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
      await api.post('/channels/users', {
        channel_id: channelId,
        user_ids: selectedUsers.map((u) => u.value),
      })
      toast.success(`Added users to the channel '#${channel.name}'`, {
        ...successToastOptions,
        id: 'post-channel-users-success',
      })
      setSelectedUsers([])
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong while adding users to the channel', {
        ...appErrorToastOptions,
        id: 'post-channel-users-error',
      })
    }
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

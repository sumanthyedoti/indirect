import React, { useState, FC } from 'react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import Select, { InputActionMeta } from 'react-select'
import { Dialog } from '@headlessui/react'

import useUserStore from '../../store/useUserStore'
import { useQuerySpace } from '../../queries'
import { Button } from '../atoms'
import { Close } from '../../icons'
import useStore from './store'
import stylesConfig from '../../config/react-select-styles'
// import api from '../../axios'

const emailSchema = yup.string().email('Not a valid email')

interface AddPeoleProps {
  dummy?: null
}
type OptionT = {
  value: string
  label: string
}

const AddPeole: FC<AddPeoleProps> = () => {
  const [inputValue, setInputValue] = useState('')
  const [inviteeEmails, setInviteeEmails] = useState<OptionT[]>([])
  const [error, setError] = useState<string | null>(null)
  const { spaceId } = useUserStore()
  const { data: space } = useQuerySpace(spaceId)
  const { closeInvitePeopleModal } = useStore()

  const onPeopleChange = (data: any) => {
    console.log({ data })
    if (data.length) setError(null)
    setInviteeEmails(data)
  }
  const onInvitePeople = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inviteeEmails.length === 0) {
      setError('Please enter email(s) to send invites')
      return
    }
    try {
      // const email = selectedUsers.map((u) => u.value)
      // await api.post(`/channels/${channelId}/users`, {
      //   user_ids: userIds,
      //   space_id: spaceId,
      // })
      // toast.success(`Added users to the channel '#${channel.name}'`, {
      //   id: 'post-channel-users-success',
      // })
      // queryClient.setQueryData<ChannelMembers>(
      //   ['channel-users', channelId],
      //   (oldData) => {
      //     if (!oldData) return userIds
      //     return [...oldData, ...userIds]
      //   }
      // )
      // setInviteeEmails([])
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong while sending invitions', {
        id: 'invite-users-error',
      })
    }
  }

  const handleInputChange = (value: string, meta: InputActionMeta) => {
    if (meta.action === 'input-change') {
      setInputValue(value)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!inputValue) return
    if (['Enter', 'Tab'].includes(event.key)) {
      console.log(inputValue)
      emailSchema
        .validate(inputValue)
        .then(() => {
          setInviteeEmails([
            ...inviteeEmails,
            { value: inputValue, label: inputValue },
          ])
          setInputValue('')
          setError(null)
        })
        .catch((err) => {
          setError(err.errors[0])
        })
    }
  }

  if (!space) return null

  return (
    <Dialog.Panel
      className="relative z-10 p-5"
      style={{
        minHeight: '200px',
      }}
    >
      <div className="flex items-center space-x-2">
        <Dialog.Title as="h2" className="mb-0">
          Invite Peple
        </Dialog.Title>
      </div>
      <p className="self-end mb-4"># {space.name}</p>
      <form className="" onSubmit={onInvitePeople}>
        <label htmlFor="emails" className="pb-1 text-sm uppercase">
          Emails
        </label>
        <Select
          inputId="emails"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onKeyDown={handleKeyDown}
          onInputChange={handleInputChange}
          styles={stylesConfig}
          isMulti
          inputValue={inputValue}
          menuIsOpen={false}
          placeholder="name@example.com"
          value={inviteeEmails}
          onChange={onPeopleChange}
          menuPortalTarget={document.body}
        />
        {error && <em className="text-sm text-red-400">{error}</em>}
        <Button type="submit" className="w-full mt-6" label="Invite" />
      </form>
      <button
        aria-label="Close"
        onClick={closeInvitePeopleModal}
        className="absolute icon top-6 right-4"
      >
        <Close />
      </button>
    </Dialog.Panel>
  )
}

export default AddPeole

import React, { useState, useCallback, FC } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Dialog } from '@headlessui/react'

import {
  CreateChannel as CreateChannelT,
  Channel as ChannelT,
  Constraints,
} from '@api-types/channels'
import useUserStore from '../../store/useUserStore'
import { Button, Input } from '../atoms'
import { FormInput } from '../molecules'
import api from '../../axios'

const schema = yup.object().shape({
  space_id: yup.number().required(),
  creator_id: yup.number().required(),
  name: yup
    .string()
    .trim()
    .required('Please provide the channel name!')
    .max(
      Constraints.name,
      `Please keep it under ${Constraints.name} characters`
    ),
  description: yup
    .string()
    .trim()
    .nullable()
    .max(Constraints.description, `Too large. Please edit`),
})

interface Props {
  close: () => void
  spaceParamId: number
}

const CreateChannel: FC<Props> = ({ close, spaceParamId }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { spaceId, user } = useUserStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChannelT>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const createChannel = useCallback(
    async (data: CreateChannelT) => {
      setIsProcessing(true)
      try {
        const {
          data: { data: newChannel },
        } = await api.post<{ data: ChannelT }>('/channels', data)
        close()
        toast.success('Channel created', {
          id: 'post-channel-success',
        })

        queryClient.setQueryData<ChannelT[] | undefined>(
          ['channels', spaceParamId],
          //@ts-ignore
          (channels) => {
            if (!channels) return newChannel
            return [...channels, newChannel]
          }
        )
        close()
        navigate(`/${spaceParamId}/${newChannel.id}`)
      } catch (err) {
        console.log(err)
        setIsProcessing(false)
        if (err.response.status === 409) {
          toast.error('Channel with the name already exists in the space', {
            id: 'post-channel-name-error',
          })
          return
        }
        toast.error('Error creating the Channel', {
          id: 'post-channel-error',
        })
      }
    },
    [spaceParamId]
  )

  const onSubmit = async (input: CreateChannelT) => {
    createChannel(input)
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value.toLowerCase())
  }

  return (
    <div>
      <Dialog.Panel
        className={`w-full max-w-lg p-6
        text-left align-middle
        bg-slate-700 transform
        rounded-md transition-all`}
      >
        <Dialog.Title as="h2" className="">
          Create Channel
        </Dialog.Title>
        <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
          <input
            hidden
            type="number"
            {...register('space_id')}
            readOnly
            value={spaceId}
          />
          <input
            hidden
            type="number"
            {...register('creator_id')}
            readOnly
            value={user?.id}
          />
          <FormInput
            label="Name"
            id="name"
            field={
              <Input
                {...register('name')}
                onChange={onNameChange}
                type="text"
              />
            }
            error={errors.name?.message}
          />
          <FormInput
            label="Description"
            id="description"
            field={
              <Input
                autoComplete="on"
                {...register('description')}
                type="text"
              />
            }
            error={errors.description?.message}
          />
          <div className="flex space-x-2">
            <Button secondary className="w-full mt-5" onClick={close}>
              Cancel
            </Button>
            <Button
              disabled={isProcessing}
              isLoading={isProcessing}
              className="w-full mt-5"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  )
}

export default CreateChannel

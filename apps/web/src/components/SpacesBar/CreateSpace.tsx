import React, { useState, useCallback, FC } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useUserStore, useSpaceStore } from '../../store'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Dialog } from '@headlessui/react'

import {
  Space as SpaceT,
  CreateSpace as CreateSpaceT,
  Constraints,
} from '@api-types/spaces'
import Modal from '../Modal'
import { Button, Input } from '../atoms'
import { FormInput } from '../molecules'
import api from '../../axios'

const schema = yup.object().shape({
  creator_id: yup.number().required(),
  name: yup
    .string()
    .trim()
    .required('Please provide the Space name!')
    .max(
      Constraints.name,
      `Please keep it under ${Constraints.name} characters`
    ),
  tagline: yup
    .string()
    .trim()
    .nullable()
    .max(
      Constraints.tagline,
      `Please keep it under ${Constraints.tagline} characters`
    ),
  description: yup
    .string()
    .trim()
    .nullable()
    .max(Constraints.description, `Too large. Please edit`),
})

interface Props {
  isOpen: boolean
  close: () => void
}
const CreateSpace: FC<Props> = ({ isOpen, close }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { user, setSpaceId } = useUserStore()
  const { setSpace } = useSpaceStore()
  const navigate = useNavigate()
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSpaceT>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const queryClient = useQueryClient()

  const onCreateNewSpace = useCallback(async (data: CreateSpaceT) => {
    try {
      setIsProcessing(true)
      const {
        data: { data: newSpace },
      } = await api.post<{ data: SpaceT }>('/spaces', data)
      toast.success('Space created', {
        id: 'post-space-success',
      })
      queryClient.setQueryData<SpaceT[] | undefined>(
        'spaces',
        //@ts-ignore
        (spaces) => {
          if (!spaces) return newSpace
          return [...spaces, newSpace]
        }
      )
      queryClient.invalidateQueries('spaces')
      setSpaceId(newSpace.id)
      setSpace(newSpace)
      navigate(`/${newSpace.id}`)
      reset()
      close()
    } catch (err) {
      setIsProcessing(false)
      console.log(err)
      toast.error('Error creating Space', {
        id: 'post-spacel-error',
      })
    }
  }, [])

  const onSubmit = async (input: CreateSpaceT) => {
    onCreateNewSpace(input)
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value.toLowerCase())
  }

  return (
    <Modal isOpen={isOpen} close={close}>
      <Dialog.Panel
        className={`w-full max-w-lg p-6
        text-left align-middle
        bg-slate-700 transform
        rounded-md transition-all`}
      >
        <Dialog.Title as="h2" className="">
          Create Space
        </Dialog.Title>
        <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
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
            label="Tagline"
            id="tagline"
            field={
              <Input autoComplete="on" {...register('tagline')} type="text" />
            }
            error={errors.tagline?.message}
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
              isLoading={isProcessing}
              disabled={isProcessing}
              className="w-full mt-5"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Dialog.Panel>
    </Modal>
  )
}

export default CreateSpace

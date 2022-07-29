import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import useUserStore from '../../store/useUserStore'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Dialog } from '@headlessui/react'

import { CreateSpace as CreateSpaceT, Constraints } from '@api-types/spaces'
import { Button, Input } from '../atoms'
import { FormInput } from '../molecules'

const schema = yup.object().shape({
  creator_id: yup.number().required(),
  name: yup
    .string()
    .required('Please provide the Space name!')
    .max(
      Constraints.name,
      `Please keep it under ${Constraints.name} characters`
    ),
  tagline: yup
    .string()
    .nullable()
    .max(
      Constraints.tagline,
      `Please keep it under ${Constraints.tagline} characters`
    ),
  description: yup
    .string()
    .nullable()
    .max(Constraints.description, `Too large. Please edit`),
})

interface Props {
  close: () => void
  createSpace: (data: CreateSpaceT) => void
}
const CreateSpace: FC<Props> = ({ close, createSpace }) => {
  const { user } = useUserStore()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSpaceT>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (input: CreateSpaceT) => {
    createSpace(input)
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
            <Button
              secondary
              className="w-full mt-5"
              label="Cancel"
              onClick={close}
            />
            <Button className="w-full mt-5" type="submit" label="Create" />
          </div>
        </form>
      </Dialog.Panel>
    </div>
  )
}

export default CreateSpace

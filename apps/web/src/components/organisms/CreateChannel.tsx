import { FC } from 'react'
import { useForm } from 'react-hook-form'
import userStore from '../../store/userStore'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Dialog } from '@headlessui/react'

import {
  CreateChannel as CreateChannelT,
  Constraints,
} from '@api-types/channels'
import { Button, Input } from '../atoms'
import { FormInput } from '../molecules'

interface CreateChannelProps {
  close: () => void
  createChannel: (data: CreateChannelT) => void
}

const schema = yup.object().shape({
  space_id: yup.number().required(),
  name: yup
    .string()
    .required('Please provide the channel name!')
    .max(
      Constraints.name,
      `Please keep it under ${Constraints.name} characters`
    ),
  description: yup
    .string()
    .nullable()
    .max(Constraints.description, `Too large. Please edit`),
})

const CreateChannel: FC<CreateChannelProps> = ({ close, createChannel }) => {
  const { spaceId } = userStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChannelT>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (input: CreateChannelT) => {
    createChannel(input)
  }

  return (
    <div>
      <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle bg-slate-700 transform rounded-md transition-all">
        <Dialog.Title as="h2" className="test">
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
          <FormInput
            label="Name"
            id="name"
            field={<Input {...register('name')} type="text" />}
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

export default CreateChannel

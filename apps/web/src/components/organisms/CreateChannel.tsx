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
  name: yup
    .string()
    .required('Please provide the channel name!')
    .max(
      Constraints.name,
      `Please keep it under ${Constraints.name} characters`
    ),
  description: yup
    .string()
    .max(Constraints.description, `Too large. Please edit`),
})

const CreateChannel: FC<CreateChannelProps> = () => {
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
    console.log(input)

    // try {
    //   const { data } = await api.post('/login', input)
    // } catch (error) {
    //   const err = error as AxiosError
    //   if (err.response?.status === 401) {
    //     toast.error('Email/password invalid!', userErrorToastOptions)
    //   } else {
    //     toast.error(
    //       'Something went wrong. Please try again',
    //       appErrorToastOptions
    //     )
    //   }
    // }
  }
  return (
    <div>
      <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle bg-slate-700 transform rounded-md transition-all">
        <Dialog.Title as="h2" className="test">
          Create Channel
        </Dialog.Title>
        <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
          <input hidden type="number" value={spaceId} />
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
          <Button
            secondary
            className="w-full mt-5"
            type="submit"
            label="Create"
          />
        </form>
      </Dialog.Panel>
    </div>
  )
}

export default CreateChannel

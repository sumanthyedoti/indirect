import { FC } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Dialog } from '@headlessui/react'

import userStore from '../../store/userStore'
import { useQueryUsers } from '../../queries'

interface AddPeoleProps {
  dummy?: null
}

const AddPeole: FC<AddPeoleProps> = () => {
  const { spaceId } = userStore()
  const { data, isSuccess } = useQueryUsers(spaceId)
  const options = data?.list.map((user) => ({
    value: user.id,
    label: user.fullname,
  }))
  const stylesConfig: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#1e293b',
    }),
    option: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? '#9ca3af'
        : isFocused
        ? '#334155'
        : '#475569',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: '#475569',
      borderRadius: '0.2em',
    }),
    menuList: (styles) => ({
      ...styles,
      backgroundColor: '#475569',
      borderRadius: '0.2em',
    }),
    multiValue: (styles) => ({
      ...styles,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'gray',
      ':hover': {
        backgroundColor: '#bbb',
        color: 'white',
      },
    }),
  }
  if (!isSuccess) return null

  return (
    <Dialog.Panel className="relative z-10 h-64 p-3">
      <Dialog.Title as="h2">Add People</Dialog.Title>
      <div className="relative z-20">
        <Select
          styles={stylesConfig}
          options={options}
          defaultMenuIsOpen
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
    </Dialog.Panel>
  )
}

export default AddPeole

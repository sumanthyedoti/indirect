import { FC } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Dialog } from '@headlessui/react'

import userStore from '../../store/userStore'
import { useQueryUsers } from '../../queries'
import { IconButton } from '../atoms'
import { Close, ArrowBack } from '../../icons'
import useStore from './store'

interface AddPeoleProps {
  dummy?: null
}

const AddPeole: FC<AddPeoleProps> = () => {
  const { spaceId } = userStore()
  const { closeAddPeopleModal, openChannelModal, setActiveChannelTab } =
    useStore()
  const { data } = useQueryUsers(spaceId)
  if (!data) return null
  const options = data?.list.map((user) => ({
    value: user.id,
    label: user.fullname,
  }))

  const handleGoBack = () => {
    setActiveChannelTab(1)
    openChannelModal()
    closeAddPeopleModal()
  }

  const stylesConfig: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: 'none',
      backgroundColor: '#1e293b',
      maxHeight: '72px',
      overflow: 'auto',
      color: '#e2e8f0',
    }),
    input: (styles) => ({
      ...styles,
      color: '#e2e8f0',
    }),
    option: (styles, { isFocused, isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? '#9ca3af'
        : isFocused
        ? '#334155'
        : '#475569',
      cursor: isDisabled ? 'not-allowed' : 'default',
      color: '#e2e8f0',
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
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'gray',
      ':hover': {
        backgroundColor: '#bbb',
        color: 'white',
      },
    }),
    menuPortal: (styles) => ({
      ...styles,
      position: 'absolute',
      zIndex: 100,
    }),
  }

  return (
    <Dialog.Panel className="relative z-10 h-40 p-4">
      <div className="flex items-center mb-6 space-x-2">
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
      <div className="">
        <Select
          styles={stylesConfig}
          options={options}
          isMulti
          noOptionsMessage={() => 'No matches'}
          menuPortalTarget={document.body}
        />
      </div>
      <IconButton
        aria-label="Close"
        onClick={closeAddPeopleModal}
        className="absolute top-4 right-4"
      >
        <Close />
      </IconButton>
    </Dialog.Panel>
  )
}

export default AddPeole

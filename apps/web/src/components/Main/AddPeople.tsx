import { useRef, FC } from 'react'
import Select, { StylesConfig, components, MenuProps } from 'react-select'
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
  const menuRef = useRef<HTMLDivElement>(null)
  const stylesConfig: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: 'none',
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
    menuPortal: (styles) => ({
      ...styles,
      position: 'absolute',
      zIndex: 100,
    }),
  }

  const Menu = (props: MenuProps) => {
    return (
      <div className="">
        <components.Menu {...props}>{props.children}</components.Menu>
      </div>
    )
  }

  if (!isSuccess) return null

  return (
    <Dialog.Panel ref={menuRef} className="relative z-10 h-40 p-4">
      <Dialog.Title as="h2">Add People</Dialog.Title>
      <div className="">
        <Select
          styles={stylesConfig}
          options={options}
          defaultMenuIsOpen
          isMulti
          menuPortalTarget={document.body}
          components={{ Menu }}
        />
      </div>
    </Dialog.Panel>
  )
}

export default AddPeole

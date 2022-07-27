import { StylesConfig } from 'react-select'

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
    backgroundColor: isDisabled ? '#475569' : isFocused ? '#334155' : '#475569',
    cursor: isDisabled ? 'not-allowed' : 'default',
    color: '#e2e8f0',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#475569',
    borderRadius: '0.4rem',
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

export default stylesConfig

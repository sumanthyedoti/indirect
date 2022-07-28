import { Toaster } from 'react-hot-toast'

const ToasterC = () => (
  <Toaster
    containerStyle={{
      marginBottom: '3rem',
      marginRight: '3vw',
    }}
    toastOptions={{
      // default options
      duration: 4000,
      style: {},

      // for specific types
      success: {
        duration: 4000,
        position: 'top-center',
      },
      error: {
        duration: 6000,
        position: 'bottom-right',
      },
    }}
  />
)

export default ToasterC

import { ToastOptions } from 'react-hot-toast'

const successToastOptions: ToastOptions = {
  duration: 3000,
  position: 'top-center',
}

const warningToastOptions: ToastOptions = {
  duration: 4000,
  position: 'bottom-right',
}
const userErrorToastOptions: ToastOptions = {
  duration: 5000,
  position: 'top-center',
}
const appErrorToastOptions: ToastOptions = {
  duration: 5000,
  position: 'bottom-right',
}

export {
  userErrorToastOptions,
  appErrorToastOptions,
  successToastOptions,
  warningToastOptions,
}

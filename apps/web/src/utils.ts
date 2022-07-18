import { ToastOptions } from 'react-hot-toast'
function doesHttpOnlyCookieExist(cookiename: string) {
  const d = new Date()
  d.setTime(d.getTime() + 1000)
  const expires = 'expires=' + d.toUTCString()

  document.cookie = cookiename + '=new_value;path=/;' + expires
  return document.cookie.indexOf(cookiename + '=') == -1
}

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
  doesHttpOnlyCookieExist,
  userErrorToastOptions,
  appErrorToastOptions,
  successToastOptions,
  warningToastOptions,
}

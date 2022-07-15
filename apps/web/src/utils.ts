import { toast, cssTransition, ToastOptions } from 'react-toastify'
function doesHttpOnlyCookieExist(cookiename: string) {
  const d = new Date()
  d.setTime(d.getTime() + 1000)
  const expires = 'expires=' + d.toUTCString()

  document.cookie = cookiename + '=new_value;path=/;' + expires
  return document.cookie.indexOf(cookiename + '=') == -1
}

const bottom = cssTransition({
  enter: 'toast-bottom-enter',
  exit: 'toast-bottom-exit',
})

const top = cssTransition({
  enter: 'toast-top-enter',
  exit: 'toast-top-exit',
})

const toastOptions: ToastOptions = {
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
  pauseOnHover: false,
}

const errorToastOptions: ToastOptions = {
  autoClose: 5000,
  type: toast.TYPE.ERROR,
  position: toast.POSITION.BOTTOM_RIGHT,
  transition: bottom,
  ...toastOptions,
}
const successToastOptions: ToastOptions = {
  autoClose: 3000,
  type: toast.TYPE.SUCCESS,
  position: toast.POSITION.TOP_LEFT,
  transition: top,
  ...toastOptions,
}

const warningToastOptions: ToastOptions = {
  autoClose: 3000,
  type: toast.TYPE.WARNING,
  position: toast.POSITION.TOP_LEFT,
  transition: top,
  ...toastOptions,
}

export {
  doesHttpOnlyCookieExist,
  errorToastOptions,
  successToastOptions,
  warningToastOptions,
}

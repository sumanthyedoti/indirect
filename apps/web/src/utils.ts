import { toast, cssTransition } from 'react-toastify'
function doesHttpOnlyCookieExist(cookiename: string) {
  const d = new Date()
  d.setTime(d.getTime() + 1000)
  const expires = 'expires=' + d.toUTCString()

  document.cookie = cookiename + '=new_value;path=/;' + expires
  return document.cookie.indexOf(cookiename + '=') == -1
}

const slideUp = cssTransition({
  enter: 'toast-enter',
  exit: 'toast-exit',
})

const errorToastOptions = {
  autoClose: 6000,
  type: toast.TYPE.ERROR,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
  progress: 0,
  pauseOnHover: true,
  transition: slideUp,
}

export { doesHttpOnlyCookieExist, errorToastOptions }

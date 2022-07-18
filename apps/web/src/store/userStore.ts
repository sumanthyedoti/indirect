import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { doesHttpOnlyCookieExist } from '../utils'

type User = {
  email: string
  fullname: string
  id: number
}

interface UserData {
  user: User | null
  isLoggedIn: boolean
  isSessionExpired?: boolean
  login: (user: User) => void
  logout: () => void
}

const initialState = {
  isLoggedIn: false,
  isSessionExpired: false,
  user: null,
}

// @ts-ignore
const store = (set) => ({
  ...initialState,
  login: (user: UserData) =>
    set(() => ({ isLoggedIn: true, user: { ...user } })),
  logout: () => set(() => ({ isLoggedIn: false, user: null })),
})
const storeThroughtMiddlewares = devtools(
  // @ts-ignore
  persist<UserData>(store, {
    name: 'user-store',
    getStorage: () => localStorage,
    serialize: (state) => JSON.stringify(state),
    deserialize: (str) => {
      const cookieExists = doesHttpOnlyCookieExist('sid')
      if (cookieExists) return JSON.parse(str)
      return {
        ...initialState,
        isSessionExpired: true,
      }
    },
  })
)
// @ts-ignore
const useStore = create<UserData>(storeThroughtMiddlewares)
export default useStore

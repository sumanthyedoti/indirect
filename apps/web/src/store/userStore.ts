import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { doesHttpOnlyCookieExist } from '../utils'

import { User as UserT } from '@api-types/users'

interface UserData {
  user: UserT | null
  isLoggedIn: boolean
  isSessionExpired?: boolean
  spaceId: number
  channelId: number
  login: (user: UserT) => void
  logout: () => void
  setSpaceId: (id: number) => void
  setChannelId: (id: number) => void
}

const initialState = {
  isLoggedIn: false,
  isSessionExpired: false,
  user: null,
}

// @ts-ignore
const store: (any) => UserData = (set) => ({
  ...initialState,
  login: (user) => set(() => ({ isLoggedIn: true, user: { ...user } })),
  logout: () => set(() => ({ isLoggedIn: false, user: null })),
  setSpaceId: (id) => set((state: UserData) => ({ ...state, spaceId: id })),
  setChannelId: (id) => set((state: UserData) => ({ ...state, channelId: id })),
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

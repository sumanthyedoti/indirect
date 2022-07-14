import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type User = {
  email: string
  fullname: string
  id: number
}

interface UserData {
  user: User | null
  isLoggedIn: boolean
  id: number
  login: (user: User) => void
  logout: () => void
}

// @ts-ignore
const store = (set) => ({
  isLoggedIn: false,
  user: null,
  login: (user: UserData) =>
    set(() => ({ isLoggedIn: true, user: { ...user }, id: user.id })),
  logout: () => set(() => ({ isLoggedIn: false, user: null, id: null })),
})
const pipedStore = devtools(
  // @ts-ignore
  persist<UserData>(store, {
    name: 'user-store',
    getStorage: () => localStorage,
  })
)
// @ts-ignore
const useStore = create<UserData>(pipedStore)
export default useStore

import create from 'zustand'

interface UserStore {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const useStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false })),
}))

export default useStore

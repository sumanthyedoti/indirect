import create from 'zustand'

interface StateT {
  // state
  isChannelModalOpen: boolean
  activeChannelTab: number
  isAddPeopleModalOpen: boolean
  // actions
  openChannelModal: () => void
  closeChannelModal: () => void
  setActiveChannelTab: (i: number) => void
  openAddPeopleModal: () => void
  closeAddPeopleModal: () => void
}

const initialState = {
  isChannelModalOpen: false,
  activeChannelTab: 0,
  isAddPeopleModalOpen: false,
}

const useStore = create<StateT>((set) => ({
  ...initialState,
  openChannelModal: () =>
    set((state) => ({ ...state, isChannelModalOpen: true })),
  closeChannelModal: () =>
    set((state) => ({ ...state, isChannelModalOpen: false })),
  setActiveChannelTab: (i: number) =>
    set((state) => ({ ...state, activeChannelTab: i })),
  openAddPeopleModal: () =>
    set((state) => ({ ...state, isAddPeopleModalOpen: true })),
  closeAddPeopleModal: () =>
    set((state) => ({ ...state, isAddPeopleModalOpen: false })),
}))
export default useStore

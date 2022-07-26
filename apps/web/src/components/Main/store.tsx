import create from 'zustand'

interface StateT {
  isChannelModalOpen: boolean
  isAddPeopleModalOpen: boolean
  activeChannelTab: number
  openChannelModal: () => void
  closeChannelModal: () => void
  openAddPeopleModal: () => void
  closeAddPeopleModal: () => void
  setActiveChannelTab: (i: number) => void
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
  openAddPeopleModal: () =>
    set((state) => ({ ...state, isAddPeopleModalOpen: true })),
  closeAddPeopleModal: () =>
    set((state) => ({ ...state, isAddPeopleModalOpen: false })),
  setActiveChannelTab: (i: number) =>
    set((state) => ({ ...state, activeChannelTab: i })),
}))
export default useStore

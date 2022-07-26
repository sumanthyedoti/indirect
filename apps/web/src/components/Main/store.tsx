import create from 'zustand'

interface StateT {
  isChannelModalOpen: boolean
  isAddPeopleModalOpen: boolean
  openChannelModal: () => void
  closeChannelModal: () => void
  openAddPeopleModal: () => void
  closeAddPeopleModal: () => void
}

const initialState = {
  isChannelModalOpen: false,
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
}))
export default useStore

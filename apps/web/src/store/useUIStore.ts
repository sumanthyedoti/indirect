import create from 'zustand'

interface StateT {
  // state
  isConfirmationModalOpen: boolean
  // actions
  openConfirmationModal: () => void
  closeConfirmationModal: () => void
}

const initialState = {
  isConfirmationModalOpen: false,
}

const useStore = create<StateT>((set) => ({
  ...initialState,
  openConfirmationModal: () =>
    set((state) => ({ ...state, isConfirmationModalOpen: true })),
  closeConfirmationModal: () =>
    set((state) => ({ ...state, isConfirmationModalOpen: false })),
}))

export default useStore

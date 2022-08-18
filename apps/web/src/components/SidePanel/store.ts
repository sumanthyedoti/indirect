import create from 'zustand'

interface StateT {
  // state
  isInvitePeopleModalOpen: boolean
  isLeaveConfirmModalOpen: boolean
  // actions
  openLeaveConfirmModal: () => void
  closeLeaveConfirmModal: () => void
  openInvitePeopleModal: () => void
  closeInvitePeopleModal: () => void
}

const initialState = {
  isLeaveConfirmModalOpen: false,
  isInvitePeopleModalOpen: false,
}

const useStore = create<StateT>((set) => ({
  ...initialState,
  openInvitePeopleModal: () =>
    set((state) => ({ ...state, isInvitePeopleModalOpen: true })),
  closeInvitePeopleModal: () =>
    set((state) => ({ ...state, isInvitePeopleModalOpen: false })),
  openLeaveConfirmModal: () =>
    set((state) => ({ ...state, isLeaveConfirmModalOpen: true })),
  closeLeaveConfirmModal: () =>
    set((state) => ({ ...state, isLeaveConfirmModalOpen: false })),
}))
export default useStore

import create from 'zustand'

import { Space as SpaceT } from '@api-types/spaces'

interface StateT {
  // state
  space: SpaceT | null
  // actions
  setSpace: (space: SpaceT) => void
}

const initialState = {
  space: null,
}

const useStore = create<StateT>((set) => ({
  ...initialState,
  setSpace: (space) => set((state) => ({ ...state, space })),
}))

export default useStore

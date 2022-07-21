import { useQuery } from 'react-query'
import api from './axios'
import { SpaceUser } from '@api-types/spaces'

// const stateTime = (hrs: number) => hrs * 60 * 60 * 1000

function useQueryUsers(space_id: number) {
  return useQuery<SpaceUser[]>(
    ['users', space_id],
    async () => {
      const { data } = await api.get(`/spaces/${space_id}/users-map`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

function useQueryChannels(space_id: number) {
  return useQuery<SpaceUser[]>(
    ['channels', space_id],
    async () => {
      const { data } = await api.get(`/spaces/${space_id}/channels`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

export { useQueryUsers, useQueryChannels }

import { useQuery } from 'react-query'

import { SpaceUser } from '@api-types/spaces'
import { Channel } from '@api-types/channels'
import api from './axios'

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
  return useQuery<Channel[]>(
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

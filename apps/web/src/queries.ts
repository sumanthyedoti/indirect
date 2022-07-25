import { useQuery } from 'react-query'

import { SpaceUser, Space } from '@api-types/spaces'
import { Channel } from '@api-types/channels'
import api from './axios'

// const stateTime = (hrs: number) => hrs * 60 * 60 * 1000
//
// function useQueryUsersMap(spaceId: number) {
//   const {data} = useQueryUsers(spaceId)
//   return useQuery<{ [key: string]: SpaceUser }>(
//     ['users-map', spaceId],
//     async () => {
//       const { data } = await api.get(`/spaces/${spaceId}/users-map`)
//       return data.data
//     },
//     {
//       staleTime: Infinity,
//     }
//   )
// }

type UsersQuery = {
  list: SpaceUser[]
  idMap: {
    [key: string]: SpaceUser
  }
}
function useQueryUsers(spaceId: number) {
  return useQuery(
    ['users', spaceId],
    async () => {
      const { data } = await api.get<{ data: SpaceUser[] }>(
        `/spaces/${spaceId}/users`
      )
      const users = data.data
      const usersListAndMap: UsersQuery = { list: users, idMap: {} }
      for (let i = 0; i < users.length; i++) {
        usersListAndMap.idMap[users[i].user_id] = users[i]
      }
      return usersListAndMap
    },
    {
      staleTime: Infinity,
    }
  )
}

function useQuerySpace(spaceId: number) {
  return useQuery<Space>(
    ['space', spaceId],
    async () => {
      const { data } = await api.get(`/spaces/${spaceId}`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

function useQueryChannel(channelId: number) {
  return useQuery<Channel>(
    ['channel', channelId],
    async () => {
      const { data } = await api.get(`/channels/${channelId}`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

function useQuerySpaceChannels(spaceId: number) {
  return useQuery<Channel[]>(
    ['channels', spaceId],
    async () => {
      const { data } = await api.get(`/spaces/${spaceId}/channels`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

export {
  useQueryUsers,
  // useQueryUsersMap,
  useQuerySpaceChannels,
  useQuerySpace,
  useQueryChannel,
}

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { SpaceUser, Space } from '@api-types/spaces'
import { Channel, ChannelMembers } from '@api-types/channels'

import api from './axios'

function useQueryUserSpaces(userId: number | undefined) {
  return useQuery(
    'spaces',
    async () => {
      const { data } = await api.get<{ data: Space[] }>(
        `/users/${userId}/spaces`
      )
      return data.data
    },
    {
      staleTime: Infinity,
      enabled: !!userId,
    }
  )
}

type UsersQuery = {
  list: SpaceUser[]
  idMap: Record<string, SpaceUser>
}
function useQuerySpaceUsers(spaceId: number) {
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

function useQueryChannelMembers(channelId: number) {
  return useQuery<ChannelMembers>(
    ['channel-users', channelId],
    async () => {
      const { data } = await api.get(`/channels/${channelId}/users`)
      return data.data
    },
    {
      staleTime: Infinity,
    }
  )
}

function useRemoveChannelMember(channelId: number) {
  const queryClient = useQueryClient()
  return useMutation(
    (userId: number) => api.delete(`/channels/${channelId}/users/${userId}`),
    {
      onMutate: async (userId) => {
        await queryClient.cancelQueries(['channel-users', channelId])
        const prevUsers = queryClient.getQueryData(['channel-users', channelId])
        queryClient.setQueryData<ChannelMembers | undefined>(
          ['channel-users', channelId],
          (oldData) => {
            return oldData?.filter((id) => id !== userId)
          }
        )
        return { prevUsers }
      },
      onError: (_err, _userId, context) => {
        queryClient.setQueryData(
          ['channel-users', channelId],
          context?.prevUsers
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(['channel-users', channelId])
      },
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
  useQueryUserSpaces,
  useQuerySpaceUsers,
  useQuerySpaceChannels,
  useQuerySpace,
  useQueryChannel,
  useQueryChannelMembers,
  useRemoveChannelMember,
}

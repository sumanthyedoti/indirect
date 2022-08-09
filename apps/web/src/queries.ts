import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUserStore } from './store'
import toast from 'react-hot-toast'

import { SpaceUser, Space } from '@api-types/spaces'
import {
  Channel,
  ChannelMembers,
  CreateChannelMessage,
} from '@api-types/channels'
import {
  Message as MessageT,
  CreateMessage as CreateMessageT,
} from '@api-types/messages'

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

function useQueryChannelMessages(channelId: number) {
  return useQuery<MessageT[]>(
    ['channel-messages', channelId],
    async () => {
      const { data } = await api.get(`/channels/${channelId}/messages`)
      return data.data
    },
    {
      enabled: !!channelId,
      staleTime: Infinity,
    }
  )
}

function usePostChannelMessage(channelId: number) {
  const queryClient = useQueryClient()
  const { user } = useUserStore()
  return useMutation(
    (message: CreateChannelMessage) =>
      api.post(`/channels/${channelId}/message`, message),
    {
      onMutate: async (newMessage) => {
        if (!user) return
        await queryClient.cancelQueries(['channel-messages', channelId])
        const prevMessages = queryClient.getQueryData([
          'channel-messages',
          channelId,
        ])
        queryClient.setQueryData<CreateMessageT[] | undefined>(
          ['channel-messages', channelId],
          (oldData) => {
            return [
              //@ts-ignore
              ...oldData,
              {
                ...newMessage,
                sender_id: user.id,
                channel_id: channelId,
                created_at: Date.now(),
              },
            ]
          }
        )
        return { prevMessages }
      },
      onError: (_err, _userId, context) => {
        queryClient.setQueryData(
          ['channel-messages', channelId],
          context?.prevMessages
        )
        toast.error('Error sending message', {
          id: 'post-messages-error',
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries(['channel-messages', channelId])
      },
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
  useQueryChannelMessages,
  usePostChannelMessage,
}

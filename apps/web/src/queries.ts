import { useQuery } from 'react-query'
import api from './axios'
import { SpaceUser } from '@api-types/spaces'

function useQueryUsers(space_id: number) {
  return useQuery<SpaceUser[]>(['users', space_id], async () => {
    const { data } = await api.get(`/spaces/${space_id}/users-map`)
    return data.data
  })
}

export { useQueryUsers }

import { useQuery } from 'react-query'
import api from './axios'
import { GetUser } from '@api-types/users'

function useQueryUsers() {
  return useQuery<GetUser[]>('users', async () => {
    const { data } = await api.get('/users/map')
    return data.data
  })
}

export { useQueryUsers }

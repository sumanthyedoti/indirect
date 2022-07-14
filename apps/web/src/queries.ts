import { useQuery } from 'react-query'
import api from './axios'
import T from './types.d'

function useQueryUsers() {
  return useQuery<T.User[]>('users', async () => {
    const { data } = await api.get('/users/map')
    return data.data
  })
}

export { useQueryUsers }

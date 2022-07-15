import { useQuery } from 'react-query'
import api from './axios'
import T from './types.d'

function useQueryUsers() {
  return useQuery<T.User[]>('users', async () => {
    const { data } = await api.get('/users/map')
    return data.data
  })
}

function useQueryUserLoggedIn(id: number) {
  return useQuery<T.User[]>('user-logged-in', async () => {
    try {
      const { data } = await api.get(`/users/${id}`)
      return data.data
    } catch (err) {
      console.log('ew')

      console.log(err)
    }
  })
}

export { useQueryUsers, useQueryUserLoggedIn }

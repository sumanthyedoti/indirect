import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useUserStore } from '../store'
import api from '../axios'

const useAuthPing = () => {
  const { logout } = useUserStore()
  useEffect(() => {
    authPing()
  }, [])

  const authPing = async () => {
    try {
      await api.get(`/users/ping`)
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        logout()
      }
      toast.error('Session expired. Please login', {
        id: 'auth-error',
      })
    }
  }
}

export default useAuthPing

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useUserStore } from '../store'

const socket = io('ws://localhost:8000', {
  autoConnect: false,
  withCredentials: true,
})

const useSocket = () => {
  const store = useUserStore()
  useEffect(() => {
    socket.on('connect_error', () => {
      console.log('error connecting to socket')
      store.logout()
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return socket
}

export default useSocket

import { useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('ws://localhost:4000', {
  autoConnect: false,
  withCredentials: true,
})

const useSocket = () => {
  useEffect(() => {
    socket.connect()
    socket.on('connect_error', () => {
      console.log('error connecting to socket')
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return socket
}

export default useSocket

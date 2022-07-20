import { Server } from 'socket.io'
import { Message } from '@api-types/messages'

let io: Server | null = null

const messageServer = (socketio: Server) => {
  io = socketio
}

export const broadcastMessage = (message: Message) => {
  io?.emit('message_received', message)
}

export default messageServer

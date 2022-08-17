import { Server } from 'socket.io'
// import { Message } from '@api-types/messages'
import channelController from './components/channels/channel-controller'

const messageServer = (socketio: Server) => {
  socketio.on('connection', (socket) => {
    console.log('a user connected ', socket.id)
    // if (process.env.NODE_ENV === 'development') {
    socket.onAny((event, ...args) => {
      console.log('💬 log:: ', event, args)
    })
    // }

    socket.on('join-space', (spaceId: number) => {
      socket.join(`space-${spaceId}`)
    })

    socket.on('message', (text, tempId, channelId, spaceId) => {
      channelController.createChannelMessageOnSocket(socket, socketio, {
        text,
        tempId,
        channelId,
        spaceId,
      })
    })
  })
}

// export const broadcastMessage = (message: Message) => {
//   io?.emit('message_received', message)
// }

export default messageServer

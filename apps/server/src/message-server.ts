import { Server } from 'socket.io'
// import { Message } from '@api-types/messages'
import channelController from './components/channels/channel-controller'
import userModel from './components/user/user-model'

const messageServer = (socketio: Server) => {
  socketio.on('connection', (socket) => {
    console.log('a user connected ', socket.id)
    // if (process.env.NODE_ENV === 'development') {
    socket.onAny((event, ...args) => {
      console.log('💬 log:: ', event, args)
    })
    // }

    socket.on('join-channel-rooms', async () => {
      const userId = socket.request.user?.id
      if (!userId) return
      const userChannels = await userModel.getUserChannelIds(userId)
      userChannels?.forEach(({ id }) => {
        socket.join(`channel-${id}`)
      })
    })

    socket.on(
      'message',
      (html, json_stringified, tempId, channelId, spaceId) => {
        channelController.createChannelMessageOnSocket(socket, socketio, {
          html,
          json_stringified,
          tempId,
          channelId,
          spaceId,
        })
      }
    )
  })
}

// export const broadcastMessage = (message: Message) => {
//   io?.emit('message_received', message)
// }

export default messageServer

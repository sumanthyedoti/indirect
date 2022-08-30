import { Server } from 'socket.io'
import { SocketMessage as SocketMessageT } from '@api-types/messages'
import channelController from './components/channels/channel-controller'
import userModel from './components/user/user-model'

const messageServer = (socketio: Server) => {
  socketio.on('connection', (socket) => {
    console.log('a user connected ', socket.id)
    // if (process.env.NODE_ENV === 'development') {
    //   socket.onAny((event, ...args) => {
    //     console.log('💬 log:: ', event, args)
    //   })
    // }

    socket.on('join-space-and-channels', async () => {
      const userId = socket.request.user?.id
      if (!userId) return // TODO: inform user Unautherized -> login
      // join spaces
      const userSpaceIds = await userModel.getUserSpaceIds(userId)
      userSpaceIds?.forEach((id) => {
        socket.join(`space-${id}`)
      })
      // join channels
      const userChannelIds = await userModel.getUserChannelIds(userId)
      userChannelIds?.forEach((id) => {
        socket.join(`channel-${id}`)
      })
    })

    socket.on('message', (message: SocketMessageT) => {
      channelController.createChannelMessageOnSocket(socket, socketio, message)
    })
  })
}

// export const broadcastMessage = (message: Message) => {
//   io?.emit('message_received', message)
// }

export default messageServer

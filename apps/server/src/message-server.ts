import { Server } from 'socket.io'
import { SocketMessage as SocketMessageT } from '@api-types/messages'
import channelController from './components/channels/channel-controller'
import userModel from './components/user/user-model'

let io: Server

const messageServer = (socketio: Server) => {
  io = socketio
  io.on('connection', (socket) => {
    const userId = socket.request.user?.id
    if (!userId) return // TODO: inform user Unautherized -> login

    console.log('a user connected ', socket.id)
    // if (process.env.NODE_ENV === 'development') {
    //   socket.onAny((event, ...args) => {
    //     console.log('💬 log:: ', event, args)
    //   })
    // }

    socket.on('join-space-and-channels', async () => {
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
      channelController.createChannelMessageOnSocket(socket, io, message)
    })
  })
}

const joinUserToChannel = (userId: number, channelId: number) => {
  const userSocketsMap = io.sockets.adapter.rooms.get(userId.toString())
  if (!userSocketsMap) return
  ;[...userSocketsMap].forEach((socketId) => {
    const socket = io.sockets.sockets.get(socketId)
    if (!socket) return
    socket.join(`channel-${channelId}`)
  })
}

export { messageServer as default, joinUserToChannel }

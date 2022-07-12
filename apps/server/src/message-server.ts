import { Socket, Server } from 'socket.io'

const messageServer = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('a user connected ', socket.id)
  })
}

export default messageServer

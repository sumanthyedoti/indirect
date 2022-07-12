import express, { Application } from 'express'
import dotenv from 'dotenv'
import { createServer as createHTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'

import router from './router'
import userRouter from './components/user/user-router'
import messageRouter from './components/message/message-router'
import passportConfig from './config/passport'
import { expressSessionMiddleware, socketAuthentication } from './middlewares'
import messageServer from './message-server'

const port = process.env.PORT || 8000
const wsPort = process.env.WS_PORT || 4000

const whiteList = ['http://localhost:3000']

dotenv.config()
const app: Application = express()
app.use(helmet())
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: whiteList,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
)

declare module 'express' {
  interface User {
    // @ts-ignore
    user: { [key: string]: any }
  }
}

// app.set('trust proxy', 1) // trust first proxy
app.use(expressSessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use(router)
app.use('/users', userRouter)
app.use('/messages', messageRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`)
})

/* web sockets */

const httpServer = createHTTPServer(app)
const io = new SocketServer(httpServer, {
  cors: { origin: whiteList, credentials: true },
})

const wrap =
  //@ts-ignore
  (middleware) => (socket, next) => {
    return middleware(socket.request, {}, next)
  }

// -- connect express-session and passport to socket.io middlewares
//@ts-nocheck
io.use(wrap(expressSessionMiddleware))
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))

// -- authenticate with express session
// @ts-ignore
io.use(socketAuthentication)

messageServer(io)

httpServer.listen(wsPort, () => {
  console.log('💬 Message server running at ' + wsPort)
})

require('module-alias/register')
import path from 'path'
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
import spaceRouter from './components/spaces/space-router'
import channelRouter from './components/channels/channel-router'
import passportConfig from './config/passport'
import { expressSessionMiddleware, socketAuthentication } from './middlewares'
import messageServer from './message-server'

const port = process.env.PORT || 8000
const whiteList = ['http://localhost:3000']

dotenv.config()
const app: Application = express()

app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com'],
    },
  })
)
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
)

// app.set('trust proxy', 1) // trust first proxy
app.use(expressSessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use('/api', router)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)
app.use('/api/spaces', spaceRouter)
app.use('/api/channels', channelRouter)

const cacheDays = 30
const cacheAgeInSecs = cacheDays * 24 * 60 * 60
const webBuildPath = path.resolve(__dirname, '../../web', 'dist')
app.use(
  express.static(webBuildPath, {
    maxAge: cacheAgeInSecs,
  })
)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(webBuildPath, 'index.html'))
})

/* web sockets */
const server = createHTTPServer(app)
const io = new SocketServer(server, {
  cors: { origin: whiteList, credentials: true },
  cookie: true,
})

const wrap =
  //@ts-ignore
  (middleware) => (socket, next) => {
    return middleware(socket.request, {}, next)
  }

// -- connect express-session and passport to socket.io middlewares
io.use(wrap(expressSessionMiddleware))
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))

// -- authenticate with express session
// @ts-ignore
io.use(socketAuthentication)

app.set('socketio', io)
messageServer(io)

server.listen(port, () => {
  console.log(`⚡️ Server is running at ${port}`)
})

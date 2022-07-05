import express, { Application } from 'express'
import dotenv from 'dotenv'
import { createServer as createHTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'

import router from './router'
import userRouter from './components/user/user-router'

const port = process.env.PORT || 8000
const wsPort = process.env.WS_PORT || 4000

const whiteList = ['http://localhost:3000']

dotenv.config()
const app: Application = express()
app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: whiteList,
  })
)
console.log(process.env.COOKIE_SECRET)

// app.set('trust proxy', 1) // trust first proxy
declare module 'express-session' {
  interface SessionData {
    // @ts-ignore
    user: { [key: string]: any }
  }
}
app.use(
  session({
    // @ts-ignore
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    },
  })
)

app.use(router)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`)
})

/* web sockets */
const httpServer = createHTTPServer(app)
const io = new SocketServer(httpServer, {
  cors: { origin: whiteList },
})

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id)
})

httpServer.listen(wsPort, () => {
  console.log('💬 Message server running at ' + wsPort)
})

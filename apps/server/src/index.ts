import express, { Application } from 'express'
import dotenv from 'dotenv'
import { createServer as createHTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import connectPgSession from 'connect-pg-simple'

import router from './router'
import { sessionPool } from './db'
import passportConfig from './config/passport'

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
  })
)

declare module 'express' {
  interface User {
    // @ts-ignore
    user: { [key: string]: any }
  }
}

// app.set('trust proxy', 1) // trust first proxy
const pgSession = connectPgSession(session)
app.use(
  session({
    // @ts-ignore
    secret: process.env.COOKIE_SECRET,
    store: new pgSession({
      pool: sessionPool,
      tableName: 'sessions',
    }),
    credentials: true,
    name: 'sid',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use(router)

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

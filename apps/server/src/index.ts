import express, { Application } from 'express'
import dotenv from 'dotenv'
import { createServer as createHTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'

import { connectDB } from './db'
import router from './router'

const port = process.env.PORT || 8000
const wsPort = process.env.WS_PORT || 4000

const whiteList = ['http://localhost:3000']

dotenv.config()
connectDB()
const app: Application = express()
app.use(express.json())
app.use(
  cors({
    origin: whiteList,
  })
)
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

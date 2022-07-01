import express, { Application } from 'express'
import dotenv from 'dotenv'
import { createServer as createHTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'

import { connectDB } from './db'

import router from './router'

const port = process.env.PORT || 8000

dotenv.config()
connectDB()
const app: Application = express()
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(router)

/* sockets */
const httpServer = createHTTPServer(app)
const io = new SocketServer(httpServer, {
  cors: { origin: 'http://localhost:3000' },
})

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
httpServer.listen(4000, () => {
  console.log('💬 Message server running at 4000')
})

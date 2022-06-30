import express, { Application } from 'express'
import dotenv from 'dotenv'
import { connectDB } from '../db'

import router from './router'

const port = process.env.PORT || 8000

dotenv.config()
connectDB()
const app: Application = express()
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

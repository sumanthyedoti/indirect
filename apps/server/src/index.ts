import express, { Application } from 'express'
import dotenv from 'dotenv'
import { Client as DbClient } from 'pg'

const dbClient = new DbClient({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
})

dbClient
  .connect()
  .then(() => console.log('db connected'))
  .catch((e) => console.log(e))
  .finally(() => dbClient.end())

import router from './router'

const port = process.env.PORT || 8000

const app: Application = express()
app.use(express.json())
app.use(router)
dotenv.config()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

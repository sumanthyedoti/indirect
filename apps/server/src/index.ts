import express, { Application, Request, Response } from 'express'
const dotenv = require('dotenv')

const port = process.env.PORT || 8000

const app: Application = express()
app.use(express.json())
dotenv.config()

let requests = 0
const logReqs = () => {
  console.log(++requests)
}

app.get('/', (req: Request, res: Response) => {
  res.send('')
  logReqs()
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

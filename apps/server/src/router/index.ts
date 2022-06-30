import { Request, Response } from 'express'
import express from 'express'

import userController from '../controller/user'

const router = express.Router()

router.post('/user', userController.createPerson)

router.get('/', (req: Request, res: Response) => {
  res.send('indirect')
})

export default router

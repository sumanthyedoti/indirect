import { Request, Response } from 'express'
import express from 'express'

import userController from '../components/user'
import messageCotroller from '../components/message'

const router = express.Router()

router.post('/user', userController.createPerson)

router.post('/message', messageCotroller.createMessage)

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Hello from inDirect')
})

export default router

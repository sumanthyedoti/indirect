import { Request, Response } from 'express'
import express from 'express'

import messageCotroller from '../components/message/messageController'

const router = express.Router()

router.post('/message', messageCotroller.createMessage)

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Hello from inDirect')
})

export default router

import { Request, Response } from 'express'
import express from 'express'

import messageCotroller from '../components/message/message-controller'

const router = express.Router()

router.post('/message', messageCotroller.createMessage)

router.get('/ping', (req: Request, res: Response) => {
  req.session.user = {
    id: 0,
  }
  res.status(200).send('Hello from inDirect')
})

export default router

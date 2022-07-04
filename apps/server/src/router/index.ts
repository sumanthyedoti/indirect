import { Request, Response } from 'express'
import express from 'express'

import userController from '../components/user/userController'
import messageCotroller from '../components/message/messageController'

const router = express.Router()

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUser)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.post('/message', messageCotroller.createMessage)

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Hello from inDirect')
})

export default router

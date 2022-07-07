import { Request, Response, NextFunction } from 'express'
import express from 'express'
import passport from 'passport'

import messageCotroller from '../components/message/message-controller'
import { isAuthenticated, validateSchema } from '../middlewares'
import { loginUserSchemaValidator } from '../components/user/user-schema'
import { logger } from '../config'

const router = express.Router()

router.post('/message', messageCotroller.createMessage)

router.get('/ping', isAuthenticated, (req: Request, res: Response) => {
  res.status(200).send('Hello from inDirect')
})

router.post(
  '/login',
  validateSchema(loginUserSchemaValidator),
  passport.authenticate('local'),
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.user)
    next()
  }
)

router.get('/logout', isAuthenticated, (req: Request, res: Response) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) logger.error(err)
  })
  res.status(204).end()
})

export default router

import { Request, Response } from 'express'
import express from 'express'
import passport from 'passport'

import { loginUserSchemaValidator } from '../components/user/user-schema'
import { createUserSchemaValidator } from '../components/user/user-schema'
import userController from '../components/user/user-controller'
import { isAuthenticated, validateSchema } from '../middlewares'
import { logger } from '../config'

const router = express.Router()

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Hello from inDirect')
})

router.post(
  '/register',
  validateSchema(createUserSchemaValidator),
  userController.registerUser
)
router.post(
  '/login',
  validateSchema(loginUserSchemaValidator),
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.end(JSON.stringify(req.user))
  }
)

router.delete('/logout', isAuthenticated, (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) logger.error('::', err)
  })
  res.status(204).end()
})

export default router

import express from 'express'
import passport from 'passport'

import { validateIdParam, isLoggedIn } from '../../middlewares'

import userController from './user-controller'
import {
  createUserSchemaValidator,
  loginUserSchemaValidator,
} from './user-schema'
import { validateSchema, isLoggedIn } from '../../middlewares'

const router = express.Router()

router.post(
  '/',
  validateSchema(createUserSchemaValidator),
  userController.registerUser
)

router.post(
  '/login',
  validateSchema(loginUserSchemaValidator),
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log('in login')
      if (err) {
        res.status(500).send('Something went wrong')
        return
      }
      if (!user) {
        return res.status(440).send('Session expired')
      }
      req.logIn(user, (err) => {
        if (err) {
          res.status(500).send('Something went wrong')
          return
        }
        res.send({ message: 'Authenticated Successfully' })
        console.log(req.user)
        console.log(info)
      })
    })(req, res, next)
  }
)
router.get('/', userController.getUsers)
router.get('/:id', validateIdParam, isLoggedIn, userController.getUser)
router.put('/:id', validateIdParam, userController.updateUser)
router.delete('/:id', validateIdParam, userController.deleteUser)

export default router

import express from 'express'
import { validateIdParam } from '../../middlewares'

import userController from './user-controller'
import {
  createUserSchemaValidator,
  loginUserSchemaValidator,
} from './user-schema'
import { validateSchema } from '../../middlewares'

const router = express.Router()

router.post(
  '/',
  validateSchema(createUserSchemaValidator),
  userController.registerUser
)

router.post(
  '/login',
  validateSchema(loginUserSchemaValidator),
  userController.loginUser
)
router.get('/', userController.getUsers)
router.get('/:id', validateIdParam, userController.getUser)
router.put('/:id', validateIdParam, userController.updateUser)
router.delete('/:id', validateIdParam, userController.deleteUser)

export default router

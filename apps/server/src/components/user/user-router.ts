import express from 'express'
import { validateIdParam } from '../../middlewares'

import userController from './user-controller'
import { createUserSchemaValidator } from './user-schema'
import { validateSchema } from '../../middlewares'

const router = express.Router()

router.post(
  '/',
  validateSchema(createUserSchemaValidator),
  userController.createUser
)
router.get('/', userController.getUsers)
router.get('/:id', validateIdParam, userController.getUser)
router.put('/:id', validateIdParam, userController.updateUser)
router.delete('/:id', validateIdParam, userController.deleteUser)

export default router

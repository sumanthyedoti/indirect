import express from 'express'
import { validateId } from '../../middlewares'

import userController from './userController'
import { createUserSchemaValidator } from './user-schema'
import { validateSchema } from '../../middlewares'

const router = express.Router()

router.post(
  '/',
  validateSchema(createUserSchemaValidator),
  userController.createUser
)
router.get('/', userController.getUsers)
router.get('/:id', validateId, userController.getUser)
router.put('/:id', validateId, userController.updateUser)
router.delete('/:id', validateId, userController.deleteUser)

export default router

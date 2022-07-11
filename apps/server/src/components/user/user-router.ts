import express from 'express'
import { validateIdParam } from '../../middlewares'

import userController from './user-controller'
import { isAuthenticated } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.get('/', userController.getUsers)
router.get('/:id', validateIdParam, userController.getUser)
router.put('/:id', validateIdParam, userController.updateUser)
router.delete('/:id', validateIdParam, userController.deleteUser)

export default router

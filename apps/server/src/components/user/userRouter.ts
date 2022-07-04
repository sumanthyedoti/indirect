import express from 'express'
import { validateId } from '../../middlewares'

import userController from './userController'

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', validateId, userController.getUser)
router.put('/:id', validateId, userController.updateUser)
router.delete('/:id', validateId, userController.deleteUser)

export default router

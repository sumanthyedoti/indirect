import express from 'express'

import userController from './userController'

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router

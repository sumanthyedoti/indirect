import express from 'express'

import messageCotroller from './message-controller'
import { isAuthenticated, validateIdParam } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.get('/', messageCotroller.getMessages)
router.delete('/:id', validateIdParam, messageCotroller.deleteMessage)

export default router

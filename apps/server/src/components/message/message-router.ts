import express from 'express'

import messageCotroller from './message-controller'
import { isAuthenticated } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.get('/', messageCotroller.getMessages)

export default router

import express from 'express'

import messageCotroller from './message-controller'
import { isAuthenticated, validateSchema } from '../../middlewares'
import { createMessageSchemaValidator } from './message-schema'

const router = express.Router()

router.use(isAuthenticated)

router.post(
  '/',
  validateSchema(createMessageSchemaValidator),
  messageCotroller.createMessage
)
router.get('/', messageCotroller.getMessages)

export default router

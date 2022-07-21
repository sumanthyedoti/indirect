import express from 'express'

import { validateIdParam } from '../../middlewares'
import {
  createChannelSchemaValidator,
  updateChannelSchemaValidator,
} from './channel-schema'
import channelController from './channel-controller'
import { isAuthenticated, validateSchema } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.post(
  '/',
  validateSchema(createChannelSchemaValidator),
  channelController.createChannel
)
router.get('/:id', validateIdParam, channelController.getChannel)
router.get(
  '/:id/messages',
  validateIdParam,
  channelController.getChannelMessages
)
router.put(
  '/:id',
  // @ts-ignore
  [validateIdParam, validateSchema(updateChannelSchemaValidator)],
  channelController.UpdateChannel
)
router.delete('/:id', validateIdParam, channelController.deleteChannel)

export default router

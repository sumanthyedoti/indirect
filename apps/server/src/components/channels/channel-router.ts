import express from 'express'

import { validateIdParam } from '../../middlewares'
import {
  createChannelSchemaValidator,
  updateChannelSchemaValidator,
  createChannelMembersSchemaValidator,
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
  channelController.updateChannel
)
router.delete('/:id', validateIdParam, channelController.deleteChannel)

/* -- channel users -- */
router.post(
  '/:id/users',
  //@ts-ignore
  [validateIdParam, validateSchema(createChannelMembersSchemaValidator)],
  channelController.createChannelMembers
)
router.get('/:id/users', validateIdParam, channelController.getChannelMembers)
router.delete(
  '/:id/users/:uid',
  validateIdParam,
  channelController.deleteChannelMember
)

export default router

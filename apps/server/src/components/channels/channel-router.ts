import express from 'express'

import {
  createChannelSchemaValidator,
  updateChannelSchemaValidator,
  createChannelMembersSchemaValidator,
  createChannelMessageSchemaValidator,
} from './channel-schema'
import channelController from './channel-controller'
import {
  isAuthenticated,
  validateSchema,
  validateIdParam,
} from '../../middlewares'

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
router.post(
  '/:id/message',
  // @ts-ignore
  [validateIdParam(), validateSchema(createChannelMessageSchemaValidator)],
  channelController.createChannelMessage
)
router.put(
  '/:id',
  // @ts-ignore
  [validateIdParam(), validateSchema(updateChannelSchemaValidator)],
  channelController.updateChannel
)
router.delete('/:id', validateIdParam, channelController.deleteChannel)

/* -- channel users -- */
router.post(
  '/:id/users',
  //@ts-ignore
  [validateIdParam(), validateSchema(createChannelMembersSchemaValidator)],
  channelController.createChannelMembers
)
router.get('/:id/users', validateIdParam, channelController.getChannelMembers)
router.delete(
  '/:id/users/:uid',
  validateIdParam(['id', 'uid']),
  channelController.deleteChannelMember
)

export default router

import express from 'express'

import { validateIdParam } from '../../middlewares'
import {
  createSpaceSchemaValidator,
  updateSpaceSchemaValidator,
  invitesToSpaceSchemeValidator,
} from './space-schema'
import spaceController from './space-controller'
import {
  isAuthenticated,
  validateSchema,
  validateParams,
} from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.post(
  '/',
  validateSchema(createSpaceSchemaValidator),
  spaceController.createSpace
)
router.get('/:id', validateIdParam, spaceController.getSpace)
router.get('/:id/channels', validateIdParam, spaceController.getSpaceChannels)
router.get(
  '/:id/user-channels',
  validateIdParam,
  spaceController.getSpaceUserChannels
)
router.get('/:id/users', validateIdParam, spaceController.getSpaceUsers)
router.post(
  '/:id/users/:uid',
  validateParams(['id', 'uid']),
  //@ts-ignore
  spaceController.addUserToSpace
)
router.delete(
  '/:id/users/:uid',
  validateParams(['id', 'uid']),
  //@ts-ignore
  spaceController.deactivateUserSpaceProfile
)
router.put(
  '/:id',
  // @ts-ignore
  [validateIdParam, validateSchema(updateSpaceSchemaValidator)],
  spaceController.updateSpace
)
router.delete('/:id', validateIdParam, spaceController.deleteSpace)
router.post(
  '/invites',
  validateSchema(invitesToSpaceSchemeValidator),
  spaceController.sendInvites
)

export default router

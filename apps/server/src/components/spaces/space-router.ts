import express from 'express'

import { validateIdParam } from '../../middlewares'
import { createSpaceSchemaValidator } from './space-schema'
import spaceController from './space-controller'
import { isAuthenticated, validateSchema } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.post(
  '/',
  validateSchema(createSpaceSchemaValidator),
  spaceController.createSpace
)
router.get('/:id', validateIdParam, spaceController.getSpace)
router.get('/:id/channels', validateIdParam, spaceController.getSpaceChannels)
router.get('/:id/users', validateIdParam, spaceController.getSpaceUsers)
router.get('/:id/users-map', validateIdParam, spaceController.getSpaceUsersMap)
router.put(
  '/:id',
  // @ts-ignore
  [validateIdParam, validateSchema(createSpaceSchemaValidator)],
  spaceController.updateSpace
)
router.delete('/:id', validateIdParam, spaceController.deleteSpace)

export default router

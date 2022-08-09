import express from 'express'

import { validateIdParam } from '../../middlewares'
import {
  createSpaceSchemaValidator,
  updateSpaceSchemaValidator,
} from './space-schema'
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
router.put(
  '/:id',
  // @ts-ignore
  [validateIdParam(), validateSchema(updateSpaceSchemaValidator)],
  spaceController.updateSpace
)
router.delete('/:id', validateIdParam, spaceController.deleteSpace)

export default router

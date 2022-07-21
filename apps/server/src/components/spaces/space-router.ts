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
router.put('/:id', validateIdParam, spaceController.updateSpace)
router.delete('/:id', validateIdParam, spaceController.deleteSpace)

export default router

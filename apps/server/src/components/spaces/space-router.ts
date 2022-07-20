import express from 'express'
import { validateIdParam } from '../../middlewares'

import spaceController from './space-controller'
import { isAuthenticated } from '../../middlewares'

const router = express.Router()

router.use(isAuthenticated)

router.get('/:id', validateIdParam, spaceController.getSpace)

export default router

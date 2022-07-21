import { Response } from 'express'

import * as T from '@api-types/spaces'
import spaceModel from './space-model'
import {
  TypedRequest,
  TypedRequestParams,
  TypedRequestBody,
} from '../../types.d'
import logger from '../../config/logger'

async function createSpace(
  req: TypedRequestBody<T.CreateSpace>,
  res: Response
) {
  const { name, tagline, description } = req.body
  console.log(name)

  try {
    const space = await spaceModel.createSpace({
      name,
      tagline,
      description,
    })
    res.status(201).json({
      data: {
        id: space.id,
      },
      message: 'Created the space successfully!',
    })
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

async function getSpace(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const result: T.Space = await spaceModel.getSpace(id)
    if (!result) {
      res.status(404).json({ id, error: 'Space not found' })
      return
    }
    res.status(200).json({
      data: result,
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function updateSpace(
  req: TypedRequest<{ id: number }, T.UpdateSpace>,
  res: Response
) {
  try {
    const id = req.params.id
    const result = await spaceModel.updateSpace(id, req.body)
    if (!result) {
      res.status(404).json({ id, error: 'Space not found' })
      return
    }
    res.status(200).json({
      data: {
        id,
        ...req.body,
        message: 'Updated Successfully',
      },
      message: 'Updated the space successfully!',
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteSpace(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const result = await spaceModel.deleteSpace(id)
    if (!result) {
      res.status(404).json({ id, message: 'Space not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

export default {
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
}

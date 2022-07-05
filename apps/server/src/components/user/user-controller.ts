import { Request, Response } from 'express'

import userModel from './user-model'
import {
  TypedRequestParams,
  TypedRequestBody,
  TypedRequest,
  User,
} from '../../types.d'
import logger from '../../config/logger'

async function createUser(
  req: TypedRequestBody<{ username: string; fullname: string }>,
  res: Response
) {
  const { username, fullname } = req.body
  try {
    const exisitingUser = await userModel.getUserByUsername(username)
    if (exisitingUser) {
      res.status(409).json({ error: 'Username taken' })
    }
    const result = await userModel.createUser({ username, fullname })
    res.status(201).json({
      ...result,
      message: 'Successfully added the message!',
    })
  } catch (err) {
    // logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const result = await userModel.getUsers()
    res.status(200).json({
      ...result,
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function getUser(req: TypedRequestParams<{ id: number }>, res: Response) {
  try {
    const id = req.params.id
    const result: User = await userModel.getUser(id)
    if (!result) {
      res.status(404).json({ id, error: 'User not found' })
      return
    }
    res.status(200).json({
      ...result,
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function updateUser(
  req: TypedRequest<{ id: number }, { fullname: string }>,
  res: Response
) {
  try {
    const id = req.params.id
    const { fullname } = req.body
    const result = await userModel.updateUser({ id, fullname })
    if (!result) {
      res.status(404).json({ id, error: 'User not found' })
      return
    }
    res.status(200).json({
      id,
      fullname,
      message: 'Updated Successfully',
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteUser(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const result = await userModel.deleteUser(id)
    if (!result) {
      res.status(404).json({ id, message: 'User not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}

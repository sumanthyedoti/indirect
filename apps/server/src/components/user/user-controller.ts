import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import userModel from './user-model'
import {
  TypedRequestParams,
  TypedRequestBody,
  TypedRequest,
} from '../../types.d'
import T from './user-types.d'
import logger from '../../config/logger'

async function createUser(
  req: TypedRequestBody<T.CreateUserBodyT>,
  res: Response
) {
  const { email, fullname, password } = req.body
  try {
    const exisitingUser = await userModel.getUserByEmail(email)

    if (exisitingUser) {
      res.status(409).json({ error: 'email taken' })
      return
    }
    const salt = await bcrypt.genSalt(6)
    const passHash = await bcrypt.hash(password, salt)
    const newUserId = await userModel.createUser({
      email,
      fullname,
      password_hash: passHash,
      password_salt: salt,
    })
    res.status(201).json({
      id: newUserId,
      message: 'Successfully added the message!',
    })
  } catch (err) {
    logger.error(err)
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
    const result: T.GetUserT = await userModel.getUser(id)
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

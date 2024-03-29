import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import * as T from '@api-types/users'
import userModel from './user-model'
import {
  TypedRequestParams,
  TypedRequestBody,
  TypedRequest,
} from '../../types.d'
import logger from '../../config/logger'

async function registerUser(
  req: TypedRequestBody<T.RegisterUser>,
  res: Response
) {
  const { email, fullname, password } = req.body

  try {
    const exisitingUser = await userModel.getUserByEmail(email)

    if (exisitingUser) {
      res.status(409).json({ error: 'email taken' })
      return
    }
    const passHash = await bcrypt.hash(password, 10)

    const newUserId = await userModel.createUser({
      email,
      fullname,
      password_hash: passHash,
    })
    res.status(201).json({
      data: { id: newUserId },
      message: 'Successfully added the message!',
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function loginUser(req: TypedRequestBody<T.LoginUser>, res: Response) {
  const { email, password } = req.body
  const user = await userModel.getUserByEmail(email)

  if (!user) {
    res.status(401).json({ error: 'email/password does not match!' })
    return
  }
  const authenticated = await bcrypt.compare(password, user.password_hash)

  if (!authenticated) {
    res.status(401)
    return
  }

  res.status(200).json({
    data: {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    },
    message: 'Logged in successfully!',
  })
}

async function getUsers(req: Request, res: Response) {
  try {
    const result = await userModel.getUsers()
    res.status(200).json({
      data: result,
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function getUser(req: TypedRequestParams<{ id: number }>, res: Response) {
  try {
    const id = req.params.id
    const result: T.User = await userModel.getUser(id)
    if (!result) {
      res.status(404).json({ id, error: 'User not found' })
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

async function updateUser(
  req: TypedRequest<{ id: number }, { fullname: string }>,
  res: Response
) {
  try {
    const id = req.params.id
    const { fullname } = req.body
    const result = await userModel.updateUser(id, { fullname })
    if (!result) {
      res.status(404).json({ id, error: 'User not found' })
      return
    }
    res.status(200).json({
      data: {
        id,
        fullname,
        message: 'Updated Successfully',
      },
      message: 'Updated the user successfully!',
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

async function getUserSpaces(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const result = await userModel.getUserSpaces(id)
    if (!result) {
      res.status(404).json({ id, message: 'User not found' })
      return
    }
    res.json({
      data: result,
    })
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

export default {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserSpaces,
}

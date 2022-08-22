import { Response } from 'express'

import * as T from '@api-types/messages'
import messageModel from './message-model'
import { TypedRequestBody, TypedRequestParams } from '../../types.d'
import logger from '../../config/logger'

async function createMessage(
  req: TypedRequestBody<T.CreateMessage>,
  res: Response
) {
  const {
    html,
    json_stringified,
    sender_id,
    channel_id = null,
    personal_channel_id = null,
  } = req.body

  try {
    const message: T.Message = await messageModel.createMessage({
      html,
      json_stringified,
      sender_id,
      channel_id,
      personal_channel_id,
    })
    res.status(201).json({
      data: {
        id: message.id,
      },
      message: 'Created message successfully!',
    })
  } catch (err) {
    logger.error('::', err)
    res.send('Something went wrong!')
  }
}

async function getMessages(
  req: TypedRequestBody<T.CreateMessage>,
  res: Response
) {
  try {
    const messages = await messageModel.getMessages()
    res.status(201).json({
      data: messages,
      message: 'Created user successfully!',
    })
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

async function deleteMessage(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const { id } = req.params
    const userId = req.user?.id
    if (!userId) {
      res.sendStatus(401)
      return
    }
    const result = await messageModel.deleteMessage(id, userId)
    if (!result) {
      res.status(404).json({
        message: 'Failed. message does not exists',
      })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

export default {
  createMessage,
  getMessages,
  deleteMessage,
}

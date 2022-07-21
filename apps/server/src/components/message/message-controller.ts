import { Response } from 'express'

import * as T from '@api-types/messages'
import messageModel from './message-model'
import { TypedRequestBody } from '../../types.d'
import { broadcastMessage } from '../../message-server'

async function createMessage(
  req: TypedRequestBody<T.CreateMessage>,
  res: Response
) {
  const { text, sender_id } = req.body

  try {
    const message: T.Message = await messageModel.createMessage({
      text,
      sender_id,
    })
    res.status(201).json({
      data: {
        id: message.id,
      },
      message: 'Created message successfully!',
    })
    broadcastMessage(message)
  } catch (err) {
    console.error(err)
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

export default {
  createMessage,
  getMessages,
}

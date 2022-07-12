import { Response } from 'express'

import messageModel from './message-model'
import T from './message-types.d'
import { TypedRequestBody } from '../../types.d'

async function createMessage(
  req: TypedRequestBody<T.CreateMessage>,
  res: Response
) {
  const { text, sender_id } = req.body

  try {
    const id = await messageModel.createMessage({ text, sender_id })
    res.status(201).json({
      id,
      message: 'Created user successfully!',
    })
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
      messages,
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

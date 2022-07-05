import { Request, Response } from 'express'

import messageModel from './message-model'

async function createMessage(req: Request, res: Response) {
  const { file, text, user_id } = req.body
  try {
    const id = await messageModel.createMessage({ file, text, user_id })
    console.log(id)
    res.status(201).json({
      ...id,
      message: 'Created user successfully!',
    })
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

export default {
  createMessage,
}

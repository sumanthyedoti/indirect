import { Request, Response } from 'express'

import messageModel from '../model/message'

async function createPerson(req: Request, res: Response) {
  const { file, text, user_id } = req.body
  try {
    const id = await messageModel.createMessage({ file, text, user_id })
    console.log(id)
    res.status(201).json(id)
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

export default {
  createPerson,
}

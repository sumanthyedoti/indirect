import { Request, Response } from 'express'

import userModel from '../model/user'

async function createPerson(req: Request, res: Response) {
  const { username, fullname } = req.body
  console.log(username, fullname)
  try {
    const result = await userModel.createUser({ username, fullname })
    res.status(200).json({
      ...result,
      message: 'Succfully added the message!',
    })
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

export default {
  createPerson,
}

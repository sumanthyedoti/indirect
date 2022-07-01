import { Request, Response } from 'express'

import userModel from '../model/user'

async function createPerson(req: Request, res: Response) {
  const { username, fullname } = req.body
  console.log(username, fullname)
  try {
    const res = await userModel.createUser({ username, fullname })
    res.status(201).json({
      ...res,
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

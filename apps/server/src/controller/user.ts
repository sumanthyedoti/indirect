import { Request, Response } from 'express'

import userModel from '../model/user'

async function createPerson(req: Request, res: Response) {
  const { username, name } = req.body
  try {
    const id = await userModel.createUser({ username, name })
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

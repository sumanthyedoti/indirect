import db from '../db'

type User = {
  username: string
  name: string
}

async function createUser(user: User) {
  const { username, name } = user
  return await db('users')
    .insert({
      username,
      name,
    })
    .returning('id')
}

export default {
  createUser,
}

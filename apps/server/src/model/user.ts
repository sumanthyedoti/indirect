import db from '../db'

type User = {
  username: string
  fullname: string
}

async function createUser(user: User) {
  const { username, fullname } = user
  const [id] = await db('users')
    .insert({
      username,
      fullname,
    })
    .returning('id')
  return id
}

export default {
  createUser,
}

import db from '../../db'
import T from './user-types.d'

async function createUser(user: T.CreateUser): Promise<number> {
  const { email, fullname, password_hash } = user
  const [userCreated]: { id: number }[] = await db('users')
    .insert({
      email,
      fullname,
      password_hash,
      password_salt: 'salt',
    })
    .returning('id')
  return userCreated.id
}

async function getUsers(): Promise<T.GetUser[]> {
  const users = await db('users').select('id', 'email', 'fullname')
  return users
}

async function getUser(id: number): Promise<T.GetUser> {
  const user: T.GetUser[] = await db('users')
    .select('id', 'email', 'fullname')
    .where({ id })
  return user[0]
}

async function getUserByEmail(email: string): Promise<T.GetUserByEmail> {
  const users: T.GetUserByEmail[] = await db('users')
    .select('id', 'fullname', 'password_hash', 'password_salt')
    .where({ email })
  return users[0]
}

async function updateUser(user: T.UpdateUser): Promise<number> {
  const id: number = await db('users')
    .where({
      id: user.id,
    })
    .update({
      fullname: user.fullname,
    })
  return id
}

async function deleteUser(id: number): Promise<number> {
  const user = await db('users')
    .where({
      id,
    })
    .del()
  return user
}

export default {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
}

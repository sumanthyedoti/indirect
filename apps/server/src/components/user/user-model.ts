import * as T from '@api-types/users'
import db from '../../db'

async function createUser(user: T.CreateUser): Promise<number> {
  const { email, fullname, password_hash } = user
  const [userCreated]: { id: number }[] = await db('users')
    .insert({
      email,
      fullname,
      password_hash,
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
    .select('id', 'fullname', 'email', 'password_hash')
    .where({ email })
  return users[0]
}

async function updateUser(id: number, user: T.UpdateUser): Promise<number> {
  const userId: number = await db('users')
    .where({
      id,
    })
    .update({
      fullname: user.fullname,
    })
  return userId
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

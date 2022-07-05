import db from '../../db'
import { User } from '../../types.d'

async function createUser(user: Omit<User, 'id'>): Promise<{ id: number }> {
  const { username, fullname } = user
  const [id] = await db('users')
    .insert({
      username,
      fullname,
    })
    .returning('id')
  return id
}

async function getUsers(): Promise<User[]> {
  const users = await db('users').select('id', 'username', 'fullname')
  return users
}

async function getUser(id: number): Promise<User> {
  const user: User[] = await db('users')
    .select('id', 'username', 'fullname')
    .where({ id })
  return user[0]
}

async function updateUser(user: Omit<User, 'username'>): Promise<number> {
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
  updateUser,
  deleteUser,
}

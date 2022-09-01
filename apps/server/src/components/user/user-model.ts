import { Knex } from 'knex'

import { Space as SpaceT } from '@api-types/spaces'
import * as T from '@api-types/users'
import db from '../../db'
import logger from '../../config/logger'

async function createUser(user: T.CreateUser) {
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

async function getUsers() {
  const users: T.User[] = await db('users').select('id', 'email', 'fullname')
  return users
}

async function getUser(id: number, queryTrx: Knex.Transaction | Knex = db) {
  const user: T.User[] = await queryTrx('users')
    .select('id', 'email', 'fullname')
    .where({ id })
  return user[0]
}

async function getUserByEmail(email: string) {
  const users: T.GetUserByEmail[] = await db('users')
    .select('id', 'fullname', 'email', 'password_hash')
    .where({ email })
  return users[0]
}

async function updateUser(id: number, user: T.UpdateUser) {
  const userId: number = await db('users')
    .where({
      id,
    })
    .update({
      fullname: user.fullname,
    })
  return userId
}

async function deleteUser(id: number) {
  const userId: number = await db('users')
    .where({
      id,
    })
    .del()
  return userId
}

async function getUserSpaces(userId: number) {
  const result: { rows: SpaceT[] } = await db.raw(`
    SELECT s.*
      FROM profiles as p JOIN spaces as s
      ON p.space_id = s.id
      WHERE p.user_id = ${userId} and p.is_active = true
    `)
  return result.rows
}

async function getUserSpaceIds(userId: number) {
  const result: { rows: { id: number }[] } = await db.raw(`
    SELECT s.id
      FROM profiles as p JOIN spaces as s
      ON p.space_id = s.id
      WHERE p.user_id = ${userId} and p.is_active = true
    `)
  return result.rows.map((r) => r.id)
}

async function getUserChannelIds(user_id: number) {
  try {
    const result: { id: number }[] = await db('channel_users')
      .select(db.raw('channel_id as id'))
      .where({ user_id })
    return result.map((r) => r.id)
  } catch (err) {
    logger.error('::', err)
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserSpaces,
  getUserSpaceIds,
  getUserChannelIds,
}

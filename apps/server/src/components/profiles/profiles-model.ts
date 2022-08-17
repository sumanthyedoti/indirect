import { Knex } from 'knex'

import * as T from '@api-types/profiles'
import db from '../../db'

async function createProfile(
  profile: T.CreateProfile,
  queryTrx: Knex.Transaction | Knex = db
) {
  const createdProfile = await queryTrx('profiles')
    .insert({
      user_id: profile.user_id,
      space_id: profile.space_id,
    })
    .returning('*')
  return createdProfile
}

async function deleteProfile(space_id: number, user_id: number) {
  const id = await db('profiles')
    .where({
      user_id: user_id,
      space_id: space_id,
    })
    .del()
  console.log(id)

  return id
}

export default {
  createProfile,
  deleteProfile,
}

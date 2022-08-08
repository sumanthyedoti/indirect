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

export default {
  createProfile,
}

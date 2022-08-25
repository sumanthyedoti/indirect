import { Knex } from 'knex'

import * as T from '@api-types/profiles'
import spaceModel from '../spaces/space-model'
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
  const space = await spaceModel.getSpace(profile.space_id, queryTrx)
  await queryTrx('channel_users').insert({
    user_id: space.creator_id,
    channel_id: space.general_channel_id,
  })
  return createdProfile
}

async function deactivateProfile(space_id: number, user_id: number) {
  const id = await db('profiles')
    .where({
      user_id: user_id,
      space_id: space_id,
    })
    .update({ is_active: false })
  return id
}

export default {
  createProfile,
  deactivateProfile,
}

import { Knex } from 'knex'

import logger from '../../config/logger'
import userModel from '../user/user-model'
import * as T from '@api-types/profiles'
import { UserLeftSpace as UserLeftSpaceT } from '@api-types/spaces'
import spaceModel from '../spaces/space-model'
import db from '../../db'

async function createProfile(
  profile: T.CreateProfile,
  queryTrx: Knex.Transaction | Knex = db
) {
  const spaceUserProfile = await queryTrx('profiles').select('*').where({
    user_id: profile.user_id,
    space_id: profile.space_id,
  })
  const user = await userModel.getUser(profile.user_id)
  const space = await spaceModel.getSpace(profile.space_id, queryTrx)
  // add user to the general channel to the space
  await queryTrx('channel_users').insert({
    user_id: profile.user_id,
    channel_id: space.general_channel_id,
    space_id: profile.space_id,
  })
  if (spaceUserProfile.length === 1) {
    await queryTrx('profiles')
      .where({
        user_id: profile.user_id,
        space_id: profile.space_id,
      })
      .update({
        is_active: true,
      })
    return {
      ...spaceUserProfile[0],
      fullname: user.fullname,
      email: user.email,
      is_active: true,
    }
  }
  // create Profile
  const createdProfile = await queryTrx('profiles')
    .insert({
      user_id: profile.user_id,
      space_id: profile.space_id,
    })
    .returning('*')

  return {
    ...createdProfile[0],
    fullname: user.fullname,
    email: user.email,
  }
}

async function deactivateProfile(space_id: number, user_id: number) {
  const trx = await db.transaction()
  try {
    await trx('profiles')
      .where({
        user_id: user_id,
        space_id: space_id,
      })
      .update({ is_active: false })
    // delete user from the channels of the space
    await trx('channel_users').where({ user_id, space_id }).del()
    trx.commit()
    const result: UserLeftSpaceT = {
      user_id,
      space_id,
    }
    return result
  } catch (err) {
    logger.error('::', err)
    trx.rollback()
  }
}

export default {
  createProfile,
  deactivateProfile,
}

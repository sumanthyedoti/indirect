import { Knex } from 'knex'

import * as T from '@api-types/spaces'
import { CreateProfile as CreateProfileT } from '@api-types/profiles'
import logger from '../../config/logger'
import { Channel as ChannelT } from '@api-types/channels'
import db from '../../db'
import profileModel from '../profiles/profile-model'
import channelModel from '../channels/channel-model'

async function createSpace(space: T.CreateSpace) {
  const trx = await db.transaction()
  try {
    // create Space
    const [createdSpace]: T.Space[] = await trx('spaces')
      .insert(space)
      .returning('*')
    // create a general channel for the Space
    const generalChannel = await channelModel.createChannel(
      {
        space_id: createdSpace.id,
        name: 'general',
        creator_id: space.creator_id,
      },
      trx
    )
    if (!generalChannel) {
      throw new Error('Channel alredy exists')
    }
    // add general_channel_id to Space
    await trx('spaces')
      .update({
        general_channel_id: generalChannel.id,
      })
      .where({ id: createdSpace.id })
    // add creator profile in the Space
    await profileModel.createProfile(
      {
        space_id: createdSpace.id,
        user_id: space.creator_id,
      },
      trx
    )
    trx.commit()
    return {
      ...createdSpace,
      general_channel_id: generalChannel.id,
    }
  } catch (err) {
    logger.error('::', err)
    trx.rollback()
  }
}

async function getSpace(id: number, queryTrx: Knex.Transaction | Knex = db) {
  const [space]: T.Space[] = await queryTrx('spaces').select('*').where({ id })
  return space
}

async function getSpaceChannels(id: number) {
  const result: ChannelT[] = await db
    .select()
    .from<ChannelT>('channels')
    .where({ space_id: id })
  return result
}

async function getSpaceUserChannels(id: number, uid: number) {
  const result: { rows: T.SpaceUser[] } = await db.raw(`
    SELECT c.*
      FROM channels as c JOIN channel_users as cu
      ON c.id = cu.channel_id
      WHERE cu.space_id = ${id} AND cu.user_id = ${uid}
    `)
  return result?.rows
}

async function getSpaceUsers(id: number) {
  const result: { rows: T.SpaceUser[] } = await db.raw(`
    SELECT p.*, u.email, u.fullname
      FROM profiles as p JOIN users as u
      ON p.user_id = u.id
      WHERE p.space_id = ${id}
    `)
  return result?.rows
}

async function updateSpace(
  id: number,
  space: T.UpdateSpace,
  creator_id: number
) {
  const spaceId: number = await db('spaces')
    .where({
      id,
      creator_id,
    })
    .update({
      name: space.name,
      tagline: space.tagline,
      description: space.description,
    })
  return spaceId
}

async function deleteSpace(id: number) {
  const spaceId = await db('spaces')
    .where({
      id,
    })
    .del()
  return spaceId
}

async function createProfile(profile: CreateProfileT) {
  const trx = await db.transaction()
  try {
    const createdProfile = await profileModel.createProfile(profile, trx)
    trx.commit()
    return createdProfile
  } catch (err) {
    logger.error('::', err)
    trx.rollback()
  }
}

export default {
  createSpace,
  getSpace,
  getSpaceChannels,
  getSpaceUserChannels,
  getSpaceUsers,
  updateSpace,
  deleteSpace,
  createProfile,
}

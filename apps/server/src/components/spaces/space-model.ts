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
    // add creator profile in the Space
    await profileModel.createProfile(
      {
        space_id: createdSpace.id,
        user_id: space.creator_id,
      },
      trx
    )
    // create a general channel for the Space
    const channel = await channelModel.createChannel(
      {
        space_id: createdSpace.id,
        name: 'general',
        creator_id: space.creator_id,
      },
      trx
    )
    // add general_channel_id to Space
    await trx('spaces')
      .update({
        general_channel_id: channel.id,
      })
      .where({ id: createdSpace.id })
    trx.commit()
    return createdSpace
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
    await profileModel.createProfile(profile, trx)
    const space = await getSpace(profile.space_id, trx)
    await trx('channel_users').insert({
      user_id: profile.user_id,
      channel_id: space.general_channel_id,
    })
    return true
  } catch (err) {
    logger.error('::', err)
    trx.rollback()
  }
}

export default {
  createSpace,
  getSpace,
  getSpaceChannels,
  getSpaceUsers,
  updateSpace,
  deleteSpace,
  createProfile,
}

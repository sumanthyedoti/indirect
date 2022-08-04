import * as T from '@api-types/spaces'
import { Channel as ChannelT } from '@api-types/channels'
import db from '../../db'
import profileModel from '../profiles/profiles-model'
import channelModel from '../channels/channel-model'

async function createSpace(space: T.CreateSpace) {
  // create Space
  const [createdSpace]: T.Space[] = await db('spaces')
    .insert(space)
    .returning('*')
  // add creator profile in the Space
  await profileModel.createProfile({
    space_id: createdSpace.id,
    user_id: space.creator_id,
  })
  // create a general channel for the Space
  const channel = await channelModel.createGeneralChannel({
    space_id: createdSpace.id,
    name: 'general',
    creator_id: space.creator_id,
  })
  // add Space creator as member of general channel
  await channelModel.createChannelMembers(channel.id, {
    user_ids: [space.creator_id],
  })
  // add general_channel_id to Space
  await db('spaces')
    .update({
      general_channel_id: channel.id,
    })
    .where({ id: createdSpace.id })
  return createdSpace
}

async function getSpace(id: number) {
  const [space]: T.Space[] = await db('spaces').select('*').where({ id })
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

async function updateSpace(id: number, space: T.UpdateSpace) {
  const spaceId: number = await db('spaces')
    .where({
      id: id,
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

export default {
  createSpace,
  getSpace,
  getSpaceChannels,
  getSpaceUsers,
  updateSpace,
  deleteSpace,
}

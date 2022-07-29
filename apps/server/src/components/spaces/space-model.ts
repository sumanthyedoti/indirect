import * as T from '@api-types/spaces'
import { Channel as ChannelT } from '@api-types/channels'
import { CreateProfile as CreateProfileT } from '@api-types/profiles'
import db from '../../db'

async function createGeneralChannel(channel: {
  space_id: number
  name: string
  is_general: boolean
}) {
  const [createdChannel]: T.Space[] = await db('channels')
    .insert(channel)
    .returning('*')
  return createdChannel
}

async function createProfile(profile: CreateProfileT) {
  const createdProfile = await db('profiles')
    .insert({
      user_id: profile.user_id,
      space_id: profile.space_id,
    })
    .returning('*')
  return createdProfile
}

async function createSpace(space: T.CreateSpace) {
  const [createdSpace]: T.Space[] = await db('spaces')
    .insert(space)
    .returning('*')
  await createGeneralChannel({
    space_id: createdSpace.id,
    name: 'general',
    is_general: true,
  })
  await createProfile({
    space_id: createdSpace.id,
    user_id: space.creator_id,
  })
  return createdSpace
}

async function getSpace(id: number) {
  const [space]: T.Space[] = await db('spaces')
    .select('id', 'name', 'tagline', 'description')
    .where({ id })
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

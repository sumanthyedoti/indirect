import * as T from '@api-types/spaces'
import { Channel as ChannelT } from '@api-types/channels'
import db from '../../db'

async function createSpace(space: T.CreateSpace): Promise<T.Space> {
  const { name, tagline, description } = space
  const [spaceCreated]: T.Space[] = await db('spaces')
    .insert({
      name,
      tagline,
      description,
    })
    .returning('id')
  return spaceCreated
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
  const result: T.SpaceUser[] = await db.raw(`
    SELECT p.*, u.email, u.fullname
      FROM profiles as p JOIN users as u
      ON p.user_id = u.id
      WHERE p.space_id = ${id}
    `)
  //@ts-ignore
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

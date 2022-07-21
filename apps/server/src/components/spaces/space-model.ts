import * as T from '@api-types/spaces'
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

async function getSpace(id: number): Promise<T.Space> {
  const [space]: T.Space[] = await db('spaces')
    .select('id', 'name', 'tagline', 'description')
    .where({ id })
  return space
}

async function updateSpace(id: number, space: T.UpdateSpace): Promise<number> {
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

async function deleteSpace(id: number): Promise<number> {
  const user = await db('spaces')
    .where({
      id,
    })
    .del()
  return user
}

export default {
  createSpace,
  getSpace,
  updateSpace,
  deleteSpace,
}

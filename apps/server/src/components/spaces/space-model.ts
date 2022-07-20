import * as T from '@api-types/spaces'
import db from '../../db'

async function createSpace(space: T.CreateSpace): Promise<T.Space> {
  const { name, tagline, description } = space
  const [spaceCreated]: T.Space[] = await db('space')
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

export default {
  createSpace,
  getSpace,
}

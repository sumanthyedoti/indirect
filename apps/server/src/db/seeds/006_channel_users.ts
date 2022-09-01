import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('channel_users').truncate()

  // Inserts seed entries
  const query = knex('channel_users').insert([
    { user_id: 1, channel_id: 1, space_id: 1 },
    { user_id: 2, channel_id: 1, space_id: 1 },
  ])
  await query
}

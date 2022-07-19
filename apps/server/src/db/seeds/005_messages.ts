import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('messages').truncate()

  // Inserts seed entries
  const query = knex('messages').insert([
    { text: 'message 1', sender_id: 1, channel_id: 1 },
    { text: 'message 2', sender_id: 2, channel_id: 1 },
  ])
  await query
}

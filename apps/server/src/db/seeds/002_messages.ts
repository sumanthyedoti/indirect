import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('messages').truncate()

  // Inserts seed entries
  const query = knex('messages').insert([
    { text: 'message from ysumanth', sender_id: 1 },
    { text: 'message from sumanthy', sender_id: 2 },
  ])
  await query
}

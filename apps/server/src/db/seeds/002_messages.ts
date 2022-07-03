import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('messages').truncate()

  // Inserts seed entries
  const query = knex('messages').insert([
    { text: 'message from ysumanth', sender: 1, receiver: 2 },
    { text: 'message from sumanthy', sender: 2, receiver: 1 },
  ])
  await query
}

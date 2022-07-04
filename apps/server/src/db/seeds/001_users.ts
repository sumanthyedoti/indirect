import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  const query = knex('users').insert([
    { username: 'ysumanth', fullname: 'Yedoti Sumanth' },
    { username: 'suamnthy', fullname: 'Sumanth Yedoti' },
    { username: 'johndoe', fullname: 'John Doe' },
  ])
  await query
}

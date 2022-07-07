import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  const query = knex('users').insert([
    {
      email: 'ysumanth@gmail.com',
      fullname: 'Yedoti Sumanth',
      password_hash: 'passhash',
      password_salt: 'salt',
    },
    {
      email: 'sumanthy@gmail.com',
      fullname: 'Sumanth Yedoti',
      password_hash: 'passhash',
      password_salt: 'salt',
      quote: 'Keep Calm and Carry On',
    },
    {
      email: 'jdoe@gmail.com',
      fullname: 'John Doe',
      password_hash: 'passhash',
      password_salt: 'salt',
    },
  ])
  await query
}

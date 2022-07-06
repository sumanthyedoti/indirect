import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  const query = knex('users').insert([
    {
      username: 'ysumanth',
      fullname: 'Yedoti Sumanth',
      email: 'ysumanth@gmail.com',
      password: 'password',
    },
    {
      username: 'suamnthy',
      email: 'sumanthy@gmail.com',
      fullname: 'Sumanth Yedoti',
      password: 'password',
      quote: 'Keep Calm and Carry On',
    },
    {
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'jdoe@gmail.com',
      password: 'password',
    },
  ])
  await query
}

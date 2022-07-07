import { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  const passHash = await bcrypt.hash('password', 10)

  // Inserts seed entries
  const query = knex('users').insert([
    {
      email: 'ysumanth@gmail.com',
      fullname: 'Yedoti Sumanth',
      password_hash: passHash,
    },
    {
      email: 'sumanthy@gmail.com',
      fullname: 'Sumanth Yedoti',
      password_hash: passHash,
      quote: 'Keep Calm and Carry On',
    },
    {
      email: 'jdoe@gmail.com',
      fullname: 'John Doe',
      password_hash: passHash,
    },
  ])
  await query
}

import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('profiles').truncate()

  // Inserts seed entries
  const query = knex('profiles').insert([
    { user_id: 1, space_id: 1, display_name: 'sumanthyedoti' },
    { user_id: 2, space_id: 1 },
  ])
  await query
}

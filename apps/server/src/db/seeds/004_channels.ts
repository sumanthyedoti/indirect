import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE channels CASCADE')

  // Inserts seed entries
  const query = knex('channels').insert([
    {
      name: 'general',
      description: 'open for everyone here',
      space_id: 1,
      is_general: true,
    },
  ])
  await query
}

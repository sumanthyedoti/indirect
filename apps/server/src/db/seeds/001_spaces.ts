import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE spaces CASCADE')

  // Inserts seed entries
  const query = knex('spaces').insert([
    {
      name: 'Only Space',
      tagline: 'Its infinite',
      description: `<div>This is the only space available for all, for now.
      <br/>
      The space is exanding you know?</div>`,
    },
  ])
  await query
}

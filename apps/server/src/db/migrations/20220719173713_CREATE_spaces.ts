/*
 * create spaces table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('spaces').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('spaces', (table) => {
        table.increments('id').unsigned().primary()
        table.text('name').notNullable()
        table.text('tagline').nullable()
        table.text('description').nullable()
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('spaces')
}

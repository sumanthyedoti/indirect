/*
 * create spaces table
 */

import { Knex } from 'knex'

import { Constraints } from '@api-types/spaces'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('spaces').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('spaces', (table) => {
        table.increments('id').unsigned().primary()
        table.string('name', Constraints.name).notNullable()
        table.string('tagline', Constraints.tagline).nullable()
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

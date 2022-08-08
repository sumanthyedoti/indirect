/*
 * create spaces table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('spaces').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('spaces', (table) => {
        table.increments('id').primary()
        table.string('name', 60).notNullable()
        table.string('tagline').nullable()
        table.text('description').nullable()
        table.text('creator_id').notNullable()
        table.boolean('is_private').defaultTo(false)
        table.integer('general_channel_id')
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('spaces')
}

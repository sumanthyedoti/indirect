/*
 * create channels table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('channels').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('channels', (table) => {
        table.increments('id').primary()
        table
          .integer('space_id')
          .notNullable()
          .index()
          .references('id')
          .inTable('spaces')
          .onDelete('CASCADE')
        table.text('name').notNullable()
        table.text('description').nullable()
        table
          .integer('creator_id')
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')
        table.boolean('is_private').defaultTo(false)
        table.boolean('is_shared').defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channels')
}

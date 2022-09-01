/*
 * create channel_members table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('channel_users').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('channel_users', (table) => {
        table
          .integer('channel_id')
          .notNullable()
          .references('id')
          .inTable('channels')
          .onDelete('CASCADE')
        table
          .integer('user_id')
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')
        table.integer('space_id').notNullable().index()
        table.primary(['channel_id', 'user_id'])
        table.boolean('is_admin').defaultTo(false)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channel_users')
}

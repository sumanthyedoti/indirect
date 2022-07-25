/*
 * create channel_members table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('channel_users').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('channel_users', (table) => {
        table.increments('id').unsigned().primary()
        table
          .integer('channel_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('channels')
          .onDelete('CASCADE')
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')
        table.boolean('is_admin').defaultTo(false)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channel_users')
}

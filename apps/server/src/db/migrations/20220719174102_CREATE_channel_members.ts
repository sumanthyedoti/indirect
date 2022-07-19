/*
 * create channel_members table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('channel_members').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('channel_members', (table) => {
        table.increments('id').unsigned().primary()
        table
          .integer('channel_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('spaces')
          .onDelete('CASCADE')
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('spaces')
          .onDelete('SET NULL')
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('channel_members')
}

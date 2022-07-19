/*
 * create messages table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('messages').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('messages', (table) => {
        table.increments('id').unsigned().primary()
        table
          .integer('sender_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')
        table
          .integer('channel_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table.text('text').nullable()
        table.text('is_files_attached').defaultTo(false)
        table.boolean('is_edited').defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages')
}

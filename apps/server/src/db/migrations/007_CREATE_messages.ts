/*
 * create messages table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('messages').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('messages', (table) => {
        table.increments('id').primary()
        table
          .integer('sender_id')
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')
        table
          .integer('channel_id')
          .index()
          .references('id')
          .inTable('channels')
          .onDelete('CASCADE')
        // table
        //   .integer('personal_channel_id')
        //   .index()
        //   .references('id')
        //   .inTable('personal_channel')
        //   .onDelete('CASCADE')
        // table.check('(channel_id IS NULL) != (personal_channel_id IS NULL)')
        table.text('html').nullable()
        table.text('json_stringified').nullable()
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

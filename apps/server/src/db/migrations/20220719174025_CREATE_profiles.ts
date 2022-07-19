/*
 * create profiles(space-users) table
 */

import { Knex } from 'knex'

export const LENGTH = {
  display_picture: 200,
  display_name: 40,
  status: 100,
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('profiles').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('profiles', (table) => {
        table.increments('id').unsigned().primary()
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table
          .integer('space_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('spaces')
          .onDelete('CASCADE')
        table.string('display_picture', 200).nullable()
        table.string('display_name', 40).nullable()
        table.string('status_emoji_id', 40).nullable()
        table.string('status_text', 100).nullable()
        table.string('is_active', 100).defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('profiles')
}

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
        table
          .integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table
          .integer('space_id')
          .notNullable()
          .references('id')
          .inTable('spaces')
          .onDelete('CASCADE')
        table.primary(['user_id', 'space_id'])
        table.boolean('is_active').defaultTo(true) // if user left the space
        table.string('display_picture', 200).nullable()
        table.string('display_name', 40).nullable()
        table.specificType('status_emoji', 'CHAR(4)').nullable()
        table.timestamp('status_duration').nullable()
        table.string('status_text', 100).nullable()
        table.boolean('is_admin').defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('profiles')
}

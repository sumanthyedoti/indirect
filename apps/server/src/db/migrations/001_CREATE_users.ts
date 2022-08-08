/*
 * create users table
 */

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('email').index().notNullable().unique()
        table.string('fullname', 60).notNullable()
        table.string('password_hash').notNullable()
        table.string('google_id', 100)
        table.string('quote')
        table.boolean('is_email_verified').defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

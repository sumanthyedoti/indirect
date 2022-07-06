/*
 * create users table
 */

import { Knex } from 'knex'

import { DATA_LENGTH } from '../../components/user/user-schema'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary()
        table.string('email', DATA_LENGTH.email).index().notNullable().unique()
        table
          .string('username', DATA_LENGTH.username)
          .index()
          .notNullable()
          .unique()
        table.string('fullname', DATA_LENGTH.fullname).notNullable()
        table.string('password_hash', 100).notNullable()
        table.string('password_salt', 100).notNullable()
        table.string('google_id', DATA_LENGTH.googleId)
        table.string('quote', DATA_LENGTH.quote)
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

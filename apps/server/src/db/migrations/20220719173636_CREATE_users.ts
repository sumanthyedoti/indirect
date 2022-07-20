/*
 * create users table
 */

import { Knex } from 'knex'

import { Constraints } from '@api-types/users'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary()
        table.string('email', Constraints.email).index().notNullable().unique()
        table.string('fullname', Constraints.fullname).notNullable()
        table.string('password_hash', 100).notNullable()
        table.string('google_id', Constraints.googleId)
        table.string('quote', Constraints.quote)
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

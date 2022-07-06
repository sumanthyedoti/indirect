const { DATA_LENGTH } = require('../../components/user/user-schema')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
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
        table.string('password_hash', 100)
        table.string('password_salt', 100)
        table.string('google_id', DATA_LENGTH.googleId)
        table.string('quote', DATA_LENGTH.status)
        table.boolean('is_email_verified').defaultTo(false)
        table.timestamps(true, true)
      })
      return query
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}

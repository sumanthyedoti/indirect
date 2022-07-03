/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.hasTable().then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('messages', (table) => {
        table.increments('id').unsigned().primary()
        table.text('text').nullable()
        table.string('file').nullable()
        table
          .integer('sender')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        table
          .integer('receiver')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
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
  return knex.schema.dropTable('messages')
}

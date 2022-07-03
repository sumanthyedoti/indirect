/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable().then(function (exists) {
    if (!exists) {
      const query = knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary()
        table.string('username').notNullable().unique()
        table.string('fullname').notNullable()
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const fs = require('fs')
const path = require('path')

const schemaFilePath = path.join(
  __dirname,
  '../../../',
  'node_modules',
  'connect-pg-simple',
  'table.sql'
)
exports.up = function (knex) {
  return knex.schema.hasTable('sessions').then(function (exists) {
    if (!exists) {
      let sql = fs.readFileSync(schemaFilePath, {
        encoding: 'utf8',
        flag: 'r',
      })
      sql = sql.replaceAll('session', 'sessions')
      console.log(sql)
      const query = knex.raw(sql)
      return query
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sessions')
}

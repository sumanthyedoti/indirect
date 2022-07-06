import { Knex } from 'knex'
import fs from 'fs'
import path from 'path'

const schemaFilePath = path.join(
  __dirname,
  '../../../',
  'node_modules',
  'connect-pg-simple',
  'table.sql'
)

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('sessions').then(function (exists) {
    if (!exists) {
      let sql = fs.readFileSync(schemaFilePath, {
        encoding: 'utf8',
        flag: 'r',
      })
      sql = sql.replace(/session/g, 'sessions')
      console.log(sql)
      const query = knex.raw(sql)
      return query
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sessions')
}

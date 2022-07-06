import knex from 'knex'
import pg from 'pg'

import knexfile from './knexfile'
import config from '../config/db'

const environment = process.env.NODE_ENV || 'development'
const db = knex(knexfile[environment])

const sessionPool = new pg.Pool({
  ...config,
})

export { db as default, sessionPool }

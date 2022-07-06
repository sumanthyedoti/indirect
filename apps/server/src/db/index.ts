import knex from 'knex'
import pg from 'pg'

import knexfile from './knexfile'
// import config from '../config/db'

const environment = process.env.NODE_ENV || 'development'
const db = knex(knexfile[environment])

const sessionPool = new pg.Pool({
  host: '172.20.0.2',
  port: 5432,
  database: 'indirect',
  user: 'root',
  password: 'root',
})

// const connectDB = () => {
//   const dbClient = new DbClient({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres',
//   })
//
//   dbClient
//     .connect()
//     .then(() => console.log('📙 DB connected'))
//     .catch((e) => console.log(e))
//     .finally(() => dbClient.end())
// }

export { db as default, sessionPool }

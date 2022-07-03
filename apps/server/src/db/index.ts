import knex from 'knex'
// import { Client as DbClient } from 'pg'

import knexfile from './knexfile'

const environment = process.env.NODE_ENV || 'development'
const db = knex(knexfile[environment])

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

export { db as default }

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'postgresql',
    connection: {
      host: '172.20.0.2',
      port: 5432,
      user: 'root',
      password: 'root',
      database: 'indirect',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: process.env.DB_URL,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     port: process.env.DB_PORT,
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
}

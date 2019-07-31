module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/travelr-be',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/db_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true,
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    }
  },

};

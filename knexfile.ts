import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "docker",
      password: "docker",
      database: "example_dev",
    },
    migrations: {
      directory: "./src/infrastructure/migrations",
    },
  },

  test: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "docker",
      password: "docker",
      database: "example_test",
    },
    migrations: {
      directory: "./src/infrastructure/migrations",
    },
  },
};

export default config;

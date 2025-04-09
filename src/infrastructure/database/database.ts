import Knex from "knex";
import knexfile from "../../../knexfile.ts";

export const makeDatabase = () => {
  const knex = Knex(knexfile[process.env.NODE_ENV || "development"]);

  return {
    knex,

    async connect() {
      await knex.raw("SELECT 1");
      console.log("Database connected successfully.");
    },

    async disconnect() {
      await knex.destroy();
      console.log("Database disconnected.");
    },
  };
};
